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
import { container } from '../../../di/container';
import { TOKENS } from '../../../di/tokens';
import { GetTripsUseCase } from '../../../domain/usecases/GetTripsUseCase';
import { DeleteTripUseCase } from '../../../domain/usecases/DeleteTripUseCase';

export const useTrips = () => {
  const dispatch = useDispatch();
  const { trips, isLoading, error } = useSelector(
    (state: RootState) => state.trips,
  );

  const fetchTrips = useCallback(async () => {
    dispatch(tripsStart());
    try {
      const getTripsUseCase = container.resolve<GetTripsUseCase>(TOKENS.GetTripsUseCase);
      const result = await getTripsUseCase.execute();
      dispatch(tripsSuccess(result));
    } catch (err: any) {
      const errorMessage = err.message || 'Không thể tải danh sách chuyến đi';
      dispatch(tripsFailure(errorMessage));
    }
  }, [dispatch]);

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
                const deleteTripUseCase = container.resolve<DeleteTripUseCase>(TOKENS.DeleteTripUseCase);
                await deleteTripUseCase.execute(id);
                dispatch(tripDeleted(id));
                Alert.alert('Thành công', 'Đã xóa chuyến đi');
              } catch (err: any) {
                Alert.alert('Lỗi', err.message || 'Xóa chuyến đi thất bại');
              }
            },
          },
        ],
      );
    },
    [dispatch],
  );

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
