import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Trip } from '../../../domain/entities/Trip';

// ============================
// SELECTOR CƠ BẢN
// ============================

export const selectUser = (state: RootState) => state.auth.user;
export const selectTrips = (state: RootState) => state.trips.trips;

// ============================
// SELECTOR CHO BIỂU ĐỒ 1: PIE CHART - Cơ cấu vùng miền
// ============================

// Map destination name to region
const REGIONS_MAP: Record<string, 'north' | 'central' | 'south'> = {
  // Miền Bắc
  'hà nội': 'north',
  'hải phòng': 'north',
  'hạ long': 'north',
  'sapa': 'north',
  'ninh bình': 'north',
  'hà giang': 'north',
  'điện biên': 'north',
  'lào cai': 'north',
  
  // Miền Trung
  'đà nẵng': 'central',
  'huế': 'central',
  'hội an': 'central',
  'quảng bình': 'central',
  'phong nha': 'central',
  'quy nhơn': 'central',
  'nha trang': 'central',
  'đà lạt': 'central',
  
  // Miền Nam
  'hồ chí minh': 'south',
  'sài gòn': 'south',
  'vũng tàu': 'south',
  'phan thiết': 'south',
  'mũi né': 'south',
  'cần thơ': 'south',
  'phú quốc': 'south',
  'côn đảo': 'south',
};

const getRegionFromDestination = (destination: string): 'north' | 'central' | 'south' | 'unknown' => {
  const normalizedDest = destination.toLowerCase().trim();
  
  for (const [key, region] of Object.entries(REGIONS_MAP)) {
    if (normalizedDest.includes(key)) {
      return region;
    }
  }
  
  return 'unknown';
};

export const selectTripsByRegion = createSelector(
  [selectTrips],
  (trips) => {
    const regionCount = {
      north: 0,
      central: 0,
      south: 0,
      unknown: 0,
    };

    trips.forEach(trip => {
      // Lấy destination đầu tiên
      const destination = trip.destinations[0]?.name || trip.title || '';
      const region = getRegionFromDestination(destination);
      regionCount[region]++;
    });

    // Format for PieChart
    return [
      {
        name: 'Miền Bắc',
        population: regionCount.north,
        color: '#FF6B6B',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Miền Trung',
        population: regionCount.central,
        color: '#4ECDC4',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Miền Nam',
        population: regionCount.south,
        color: '#45B7D1',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
    ].filter(item => item.population > 0); // Chỉ hiển thị vùng có dữ liệu
  }
);

// ============================
// SELECTOR CHO BIỂU ĐỒ 2: BAR CHART - Tần suất theo tháng
// ============================

export const selectTripsByMonth = createSelector(
  [selectTrips],
  (trips) => {
    const currentYear = new Date().getFullYear();
    const monthCount = Array(12).fill(0); // [0,0,0,...,0]

    trips.forEach(trip => {
      const startDate = new Date(trip.startDate);
      if (startDate.getFullYear() === currentYear) {
        const month = startDate.getMonth(); // 0-11
        monthCount[month]++;
      }
    });

    // Format for BarChart
    return {
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      datasets: [
        {
          data: monthCount,
        },
      ],
    };
  }
);

// ============================
// SELECTOR CHO BIỂU ĐỒ 3: LINE CHART - Ngân sách theo Quý
// ============================

export const selectBudgetByQuarter = createSelector(
  [selectTrips],
  (trips) => {
    const currentYear = new Date().getFullYear();
    const quarterBudget = [0, 0, 0, 0]; // Q1, Q2, Q3, Q4

    trips.forEach(trip => {
      const startDate = new Date(trip.startDate);
      if (startDate.getFullYear() === currentYear) {
        const month = startDate.getMonth(); // 0-11
        const quarter = Math.floor(month / 3); // 0-3
        quarterBudget[quarter] += trip.budget.total;
      }
    });

    // Format for LineChart
    return {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          data: quarterBudget,
          strokeWidth: 2,
        },
      ],
    };
  }
);

// ============================
// SELECTOR CHO THỐNG KÊ TỔNG QUAN
// ============================

export const selectProfileStats = createSelector(
  [selectTrips],
  (trips) => {
    const totalTrips = trips.length;
    const totalBudget = trips.reduce((sum, trip) => sum + trip.budget.total, 0);
    const avgBudget = totalTrips > 0 ? Math.round(totalBudget / totalTrips) : 0;
    
    // Destination phổ biến nhất
    const destCount: Record<string, number> = {};
    trips.forEach(trip => {
      const dest = trip.destinations[0]?.name || trip.title || 'Không rõ';
      destCount[dest] = (destCount[dest] || 0) + 1;
    });
    
    const mostPopularDest = Object.entries(destCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Chưa có';

    return {
      totalTrips,
      totalBudget,
      avgBudget,
      mostPopularDest,
    };
  }
);