import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CHCText, CHCTouchable } from '../../../components';
import Colors from '../../../../theme/colors';
import { Size } from '../../../../theme/sizes';

// Type cho chuyến bay một chiều
interface OneWayFlight {
  airline: string;
  flightNumber?: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // phút
  price: number;
  currency: string;
}

// Type cho chuyến bay khứ hồi
interface RoundTripFlight {
  price: number;
  currency: string;
  departureFlight: {
    airline: string;
    departureTime: string;
    arrivalTime: string;
    duration: number;
  };
  returnFlight: {
    airline: string;
    departureTime: string;
    arrivalTime: string;
    duration: number;
  };
}

interface FlightResultsViewProps {
  flights: OneWayFlight[] | RoundTripFlight[];
  isRoundTrip?: boolean;
  onSelectFlight?: (flight: OneWayFlight | RoundTripFlight) => void;
}

const formatPrice = (price: number, currency: string = 'VND') => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
};

// Component hiển thị một chuyến bay một chiều
const OneWayFlightCard: React.FC<{
  flight: OneWayFlight;
  onSelect?: () => void;
}> = ({ flight, onSelect }) => (
  <CHCTouchable onPress={onSelect} style={styles.flightCard}>
    {/* Row 1: Hãng bay + Ngày */}
    <View style={styles.topRow}>
      <View style={styles.airlineRow}>
        <CHCText type="Body1" color={Colors.Primary600}>
          ✈️
        </CHCText>
        <CHCText type="Heading3" color={Colors.Gray900}>
          {flight.airline}
        </CHCText>
      </View>
      <CHCText type="Body2" color={Colors.Gray500}>
        {formatDate(flight.departureTime)}
      </CHCText>
    </View>

    {/* Row 2: Thời gian bay */}
    <View style={styles.flightRoute}>
      <View style={styles.timeBlock}>
        <CHCText type="Heading2" color={Colors.Gray900}>
          {formatTime(flight.departureTime)}
        </CHCText>
      </View>

      <View style={styles.durationBlock}>
        <View style={styles.flightLine}>
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.dot} />
        </View>
        <CHCText type="Body2" color={Colors.Gray500}>
          {formatDuration(flight.duration)} • Bay thẳng
        </CHCText>
      </View>

      <View style={styles.timeBlock}>
        <CHCText type="Heading2" color={Colors.Gray900}>
          {formatTime(flight.arrivalTime)}
        </CHCText>
      </View>
    </View>

    {/* Row 3: Giá vé */}
    <View style={styles.priceRow}>
      <CHCText type="Body2" color={Colors.Gray500}>
        Giá vé 1 chiều
      </CHCText>
      <CHCText type="Heading2" color={Colors.Success600}>
        {formatPrice(flight.price, flight.currency || 'VND')}
      </CHCText>
    </View>
  </CHCTouchable>
);

// Component hiển thị chuyến bay khứ hồi
const RoundTripFlightCard: React.FC<{
  flight: RoundTripFlight;
  onSelect?: () => void;
}> = ({ flight, onSelect }) => (
  <CHCTouchable onPress={onSelect} style={styles.flightCard}>
    <View style={styles.flightHeader}>
      <CHCText type="Heading3" color={Colors.Primary600}>
        🔄 Khứ hồi
      </CHCText>
      <CHCText type="Heading2" color={Colors.Success500}>
        {formatPrice(flight.price, flight.currency)}
      </CHCText>
    </View>

    {/* Chuyến đi */}
    <View style={styles.legContainer}>
      <CHCText type="Body2" color={Colors.Gray500} style={styles.legLabel}>
        ➡️ Chiều đi
      </CHCText>
      <View style={styles.legInfo}>
        <CHCText type="Heading3" color={Colors.Gray900}>
          {flight.departureFlight.airline}
        </CHCText>
        <CHCText type="Body1" color={Colors.Gray700}>
          {formatTime(flight.departureFlight.departureTime)} → {formatTime(flight.departureFlight.arrivalTime)}
        </CHCText>
        <CHCText type="Body2" color={Colors.Gray500}>
          {formatDuration(flight.departureFlight.duration)}
        </CHCText>
      </View>
    </View>

    {/* Chuyến về */}
    <View style={styles.legContainer}>
      <CHCText type="Body2" color={Colors.Gray500} style={styles.legLabel}>
        ⬅️ Chiều về
      </CHCText>
      <View style={styles.legInfo}>
        <CHCText type="Heading3" color={Colors.Gray900}>
          {flight.returnFlight.airline}
        </CHCText>
        <CHCText type="Body1" color={Colors.Gray700}>
          {formatTime(flight.returnFlight.departureTime)} → {formatTime(flight.returnFlight.arrivalTime)}
        </CHCText>
        <CHCText type="Body2" color={Colors.Gray500}>
          {formatDuration(flight.returnFlight.duration)}
        </CHCText>
      </View>
    </View>
  </CHCTouchable>
);

export const FlightResultsView: React.FC<FlightResultsViewProps> = ({
  flights,
  isRoundTrip = false,
  onSelectFlight,
}) => {
  if (!flights || flights.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <CHCText type="Body1" color={Colors.Gray500}>
          ✈️ Không tìm thấy chuyến bay phù hợp
        </CHCText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CHCText type="Heading3" color={Colors.Gray900} style={styles.title}>
        ✈️ Tìm thấy {flights.length} chuyến bay
      </CHCText>

      {/* Hiển thị danh sách dọc để dễ xem */}
      <View style={styles.listContainer}>
        {flights.map((flight, index) => (
          isRoundTrip ? (
            <RoundTripFlightCard
              key={index}
              flight={flight as RoundTripFlight}
              onSelect={() => onSelectFlight?.(flight)}
            />
          ) : (
            <OneWayFlightCard
              key={index}
              flight={flight as OneWayFlight}
              onSelect={() => onSelectFlight?.(flight)}
            />
          )
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Size.Spacing8,
  },
  title: {
    marginBottom: Size.Spacing12,
  },
  listContainer: {
    gap: Size.Spacing12,
  },
  flightCard: {
    backgroundColor: Colors.White,
    borderRadius: Size.Radius12,
    padding: Size.Spacing16,
    shadowColor: Colors.Gray900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.Gray200,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Size.Spacing12,
  },
  airlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Size.Spacing4,
  },
  flightRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Size.Spacing8,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray100,
  },
  timeBlock: {
    alignItems: 'center',
    minWidth: 50,
  },
  durationBlock: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Size.Spacing8,
  },
  flightLine: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: Size.Spacing4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Primary500,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.Primary200,
    marginHorizontal: Size.Spacing4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Size.Spacing12,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray100,
    marginTop: Size.Spacing8,
  },
  legContainer: {
    marginTop: Size.Spacing8,
    paddingTop: Size.Spacing8,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray200,
  },
  legLabel: {
    marginBottom: Size.Spacing4,
  },
  legInfo: {
    gap: Size.Spacing2,
  },
  emptyContainer: {
    padding: Size.Spacing16,
    alignItems: 'center',
  },
});
