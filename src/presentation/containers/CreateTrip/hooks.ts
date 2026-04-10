import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { container } from '../../../di/container';
import { TOKENS } from '../../../di/tokens';
import { CreateTripUseCase } from '../../../domain/usecases/CreateTripUseCase';
import { TripRepository } from '../../../domain/repositories/TripRepository';
import { tripCreated, tripUpdated } from '../../store/slices/tripsSlice';
import { Trip, ItineraryDay } from '../../../domain/entities/Trip';

export const TRANSPORT_MODES = [
  { label: '✈️ Máy bay', value: 'flight' },
  { label: '🚗 Phương tiện cá nhân', value: 'personal' },
];

export const useCreateTrip = (
  onSuccess: () => void,
  isEditMode: boolean = false,
  tripData?: Trip | null,
) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(tripData?.title || '');
  const [origin, setOrigin] = useState(tripData?.origin || '');
  const [startDate, setStartDate] = useState<Date | undefined>(
    tripData?.startDate ? new Date(tripData.startDate) : undefined,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    tripData?.endDate ? new Date(tripData.endDate) : undefined,
  );
  const [transportMode, setTransportMode] = useState<{ label: string; value: string } | null>(
    tripData?.transportMode
      ? TRANSPORT_MODES.find(m => m.value === tripData.transportMode) || null
      : null,
  );
  const [budget, setBudget] = useState(tripData?.budget?.total?.toString() || '');
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(tripData?.itinerary || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTrip = async () => {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên chuyến đi');
      return;
    }
    if (!startDate) {
      Alert.alert('Lỗi', 'Vui lòng chọn ngày bắt đầu');
      return;
    }
    if (!endDate) {
      Alert.alert('Lỗi', 'Vui lòng chọn ngày kết thúc');
      return;
    }
    if (!budget.trim() || isNaN(Number(budget))) {
      Alert.alert('Lỗi', 'Vui lòng nhập ngân sách hợp lệ');
      return;
    }

    setIsLoading(true);

    try {
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const tripRepository = container.resolve<TripRepository>(TOKENS.TripRepository);
      const createTripUseCase = container.resolve<CreateTripUseCase>(TOKENS.CreateTripUseCase);

      if (isEditMode && tripData?.id) {
        const updatedTrip = await tripRepository.updateTrip(tripData.id, {
          title: title.trim(),
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          origin: origin.trim() || undefined,
          transportMode: transportMode?.value,
          budget: { total: Number(budget) },
          itinerary:
            itinerary.length > 0
              ? itinerary.map(day => ({
                  day: day.day,
                  date: day.date,
                  activities: day.activities.map(activity => ({
                    time: activity.time,
                    title: activity.title,
                    location: activity.location,
                    description: activity.description,
                    cost: activity.cost,
                  })),
                }))
              : undefined,
        });

        const mergedTrip = {
          ...updatedTrip,
          itinerary:
            updatedTrip.itinerary && updatedTrip.itinerary.length > 0
              ? updatedTrip.itinerary
              : itinerary,
        };
        dispatch(tripUpdated(mergedTrip));

        Alert.alert('Thành công', 'Cập nhật chuyến đi thành công!', [
          { text: 'OK', onPress: onSuccess },
        ]);
      } else {
        const trip = await createTripUseCase.execute({
          title: title.trim(),
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          origin: origin.trim() || undefined,
          transportMode: transportMode?.value,
          destinations: [],
          budget: { total: Number(budget) },
        });

        if (itinerary.length > 0 && trip.id) {
          await tripRepository.updateTrip(trip.id, {
            itinerary: itinerary.map(day => ({
              day: day.day,
              date: day.date,
              activities: day.activities.map(activity => ({
                time: activity.time,
                title: activity.title,
                location: activity.location,
                description: activity.description,
                cost: activity.cost,
              })),
            })),
          } as any);
        }

        dispatch(tripCreated(trip));

        Alert.alert('Thành công', 'Tạo chuyến đi thành công!', [
          { text: 'OK', onPress: onSuccess },
        ]);
      }
    } catch (error: any) {
      const errorMessage =
        error.message || (isEditMode ? 'Cập nhật chuyến đi thất bại' : 'Tạo chuyến đi thất bại');
      Alert.alert('Lỗi', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    title,
    setTitle,
    origin,
    setOrigin,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    transportMode,
    setTransportMode,
    budget,
    setBudget,
    itinerary,
    setItinerary,
    isLoading,
    handleCreateTrip,
  };
};
