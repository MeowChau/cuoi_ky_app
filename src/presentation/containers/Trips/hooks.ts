import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { RootState } from '../../store/store';
import {
  tripsStart,
  tripsSuccess,
  tripsFailure,
  tripDeleted,
} from '../../store/slices/tripsSlice';
import { TripRepositoryImpl } from '../../../data/repositories/tripRepositoryImpl';
import { GetTripsUseCase } from '../../../domain/usecases/GetTripsUseCase';
import { DeleteTripUseCase } from '../../../domain/usecases/DeleteTripUseCase';

export const useTrips = () => {
  const dispatch = useDispatch();
  const { trips, isLoading, error } = useSelector(
    (state: RootState) => state.trips,
  );

  const tripRepository = new TripRepositoryImpl();    
  const getTripsUseCase = new GetTripsUseCase(tripRepository);
  const deleteTripUseCase = new DeleteTripUseCase(tripRepository);

  // Fetch trips
  const fetchTrips = useCallback(async () => {
    dispatch(tripsStart());
    try {
      const trips = await getTripsUseCase.execute();
      dispatch(tripsSuccess(trips));
    } catch (error: any) {
      const errorMessage = error.message || 'Không thể tải danh sách chuyến đi';
      dispatch(tripsFailure(errorMessage));
    }
  }, [dispatch]);

  // Delete trip
  const handleDeleteTrip = useCallback(
    async (id: string, title: string) => {
      Alert.alert(
        'Xác nhận xóa',
        `Bạn có chắc muốn xóa chuyến đi "${title}"?`,
        [
          { text: 'Hủy', style: 'cancel' },
          {
            text: 'Xóa',
            style: 'destructive',
            onPress: async () => {
              try {
                await deleteTripUseCase.execute(id);
                dispatch(tripDeleted(id));
                Alert.alert('Thành công', 'Đã xóa chuyến đi');
              } catch (error: any) {
                Alert.alert('Lỗi', error.message || 'Xóa chuyến đi thất bại');
              }
            },
          },
        ],
      );
    },
    [dispatch],
  );

  // Load trips on mount
  useEffect(() => {
    fetchTrips();
  }, []);

  return {
    trips,
    isLoading,
    error,
    refreshTrips: fetchTrips,
    deleteTrip: handleDeleteTrip,
  };
};
