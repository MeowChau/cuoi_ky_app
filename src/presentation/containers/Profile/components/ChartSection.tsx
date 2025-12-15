import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import { CHCText } from '../../../components';
import { profileStyles } from '../styles';
import Colors from '../../../../theme/colors';

const screenWidth = Dimensions.get('window').width;

interface ChartSectionProps {
  regionData: any[];
  monthData: any;
  quarterData: any;
}

export const ChartSection: React.FC<ChartSectionProps> = ({
  regionData,
  monthData,
  quarterData,
}) => {
  const chartConfig = {
    backgroundGradientFrom: Colors.White,
    backgroundGradientTo: Colors.White,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const hasRegionData = regionData.length > 0;
  const hasMonthData = monthData.datasets[0].data.some((val: number) => val > 0);
  const hasQuarterData = quarterData.datasets[0].data.some((val: number) => val > 0);

  return (
    <View style={profileStyles.chartSection}>
      {/* Biểu đồ 1: Pie Chart - Vùng miền */}
      <View style={profileStyles.chartCard}>
        <CHCText type="Heading3" style={profileStyles.chartTitle}>
          📊 Cơ cấu vùng miền
        </CHCText>
        
        {hasRegionData ? (
          <PieChart
            data={regionData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        ) : (
          <View style={profileStyles.emptyChart}>
            <CHCText type="Body2" color={Colors.Gray400}>
              Chưa có dữ liệu chuyến đi
            </CHCText>
          </View>
        )}
      </View>

      {/* Biểu đồ 2: Bar Chart - Tần suất theo tháng */}
      <View style={profileStyles.chartCard}>
        <CHCText type="Heading3" style={profileStyles.chartTitle}>
          📈 Tần suất theo tháng (năm {new Date().getFullYear()})
        </CHCText>
        
        {hasMonthData ? (
          <BarChart
            data={monthData}
            width={screenWidth - 64}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={{
              borderRadius: 16,
            }}
            showValuesOnTopOfBars
          />
        ) : (
          <View style={profileStyles.emptyChart}>
            <CHCText type="Body2" color={Colors.Gray400}>
              Chưa có chuyến đi trong năm nay
            </CHCText>
          </View>
        )}
      </View>

      {/* Biểu đồ 3: Line Chart - Ngân sách theo quý */}
      <View style={profileStyles.chartCard}>
        <CHCText type="Heading3" style={profileStyles.chartTitle}>
          💰 Ngân sách theo quý (năm {new Date().getFullYear()})
        </CHCText>
        
        {hasQuarterData ? (
          <LineChart
            data={quarterData}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              borderRadius: 16,
            }}
            formatYLabel={(value) => {
              const num = parseInt(value);
              if (num >= 1000000) {
                return `${(num / 1000000).toFixed(1)}M`;
              }
              if (num >= 1000) {
                return `${(num / 1000).toFixed(0)}K`;
              }
              return value;
            }}
          />
        ) : (
          <View style={profileStyles.emptyChart}>
            <CHCText type="Body2" color={Colors.Gray400}>
              Chưa có dữ liệu ngân sách
            </CHCText>
          </View>
        )}
      </View>
    </View>
  );
};