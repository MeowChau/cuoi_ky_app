import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { CreateTripUseCase } from '../../../domain/usecases/CreateTripUseCase';
import { TripRepositoryImpl } from '../../../data/repositories/tripRepositoryImpl';
import { tripCreated } from '../../store/slices/tripsSlice';

// Transport mode options
export const TRANSPORT_MODES = [
  { label: 'Phương tiện cá nhân', value: 'personal' },
  { label: 'Phương tiện công cộng', value: 'public' },
  { label: 'Máy bay', value: 'flight' },
  { label: 'Xe khách', value: 'bus' },
  { label: 'Tàu hỏa', value: 'train' },
];

export const useCreateTrip = (onSuccess: () => void) => {
  const dispatch = useDispatch();

  // Form states
  const [title, setTitle] = useState('');
  const [origin, setOrigin] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [transportMode, setTransportMode] = useState<{ label: string; value: string } | null>(null);
  const [budget, setBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tripRepository = new TripRepositoryImpl();
  const createTripUseCase = new CreateTripUseCase(tripRepository);

  const handleCreateTrip = async () => {
    // Basic validation
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
      // Format dates to YYYY-MM-DD
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const trip = await createTripUseCase.execute({
        title: title.trim(),
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        origin: origin.trim() || undefined,
        transportMode: transportMode?.value,
        destinations: [],
        budget: {
          total: Number(budget),
        },
      });

      // Update Redux store
      dispatch(tripCreated(trip));

      Alert.alert('Thành công', 'Tạo chuyến đi thành công!', [
        {
          text: 'OK',
          onPress: onSuccess,
        },
      ]);
    } catch (error: any) {
      const errorMessage = error.message || 'Tạo chuyến đi thất bại';
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
    isLoading,
    handleCreateTrip,
  };
};