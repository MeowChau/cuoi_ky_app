import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  ScrollView, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Text, 
  Platform 
} from 'react-native';
import { Place } from '../../../../domain/entities/Place';
import Colors from '../../../../theme/colors';

const { width, height } = Dimensions.get('window');

interface PlaceDetailModalProps {
  visible: boolean;
  onClose: () => void;
  place: Place | null;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({ visible, onClose, place }) => {
  // 🔥 1. State lưu thông tin ĐANG HIỂN THỊ (Ảnh, Tên, Mô tả)
  const [displayData, setDisplayData] = useState({
    image: place?.image,
    name: place?.name,
    description: place?.description
  });

  // 🔥 2. Khi mở modal hoặc đổi thành phố khác -> Reset về thông tin gốc của thành phố
  useEffect(() => {
    if (place) {
      setDisplayData({
        image: place.image,
        name: place.name,
        description: place.description
      });
    }
  }, [place]);

  if (!place) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Nút đóng */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          {/* 🔥 3. Hiển thị Ảnh từ state displayData */}
          <Image 
            key={displayData.image} // Key thay đổi giúp ảnh reload mượt hơn
            source={{ uri: displayData.image }} 
            style={styles.coverImage} 
            resizeMode="cover" 
          />

          <View style={styles.body}>
            {/* Header */}
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                {/* 🔥 4. Hiển thị Tên từ state */}
                <Text style={styles.title}>{displayData.name}</Text> 
                
                {/* Location giữ nguyên của thành phố cha */}
                <Text style={styles.location}>📍 {place.location}</Text>
              </View>
              
              {/* Rating giữ nguyên của thành phố */}
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {place.rating ? Number(place.rating).toFixed(1) : 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* 🔥 5. Hiển thị Mô tả từ state */}
            <Text style={styles.sectionTitle}>Giới thiệu</Text>
            <Text style={styles.description}>{displayData.description}</Text>

            {/* Các thông tin chung của thành phố (giữ nguyên không đổi) */}
            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Text style={styles.infoLabel}>🌤 Thời điểm đẹp nhất</Text>
                <Text style={styles.infoValue}>{place.bestTime || 'Quanh năm'}</Text>
              </View>
              
              <View style={[styles.infoCard, { marginTop: 12 }]}>
                <Text style={styles.infoLabel}>🍜 Đặc sản</Text>
                <Text style={styles.infoValue}>{place.specialties || 'Đang cập nhật'}</Text>
              </View>
            </View>

            {/* Danh sách địa điểm tham quan */}
            {place.famousSpots && place.famousSpots.length > 0 && (
              <View style={styles.spotsSection}>
                <Text style={styles.sectionTitle}>Địa điểm tham quan ({place.famousSpots.length})</Text>
                
                {place.famousSpots.map((spot, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[
                      styles.spotCard,
                      // Highlight nhẹ nếu đang chọn địa điểm này
                      displayData.name === spot.name && { borderColor: Colors.Primary500, borderWidth: 1 }
                    ]}
                    activeOpacity={0.7}
                    // 🔥 6. Sự kiện Click: Cập nhật toàn bộ thông tin lên trên
                    onPress={() => {
                        setDisplayData({
                            image: spot.image || place.image, // Nếu spot ko có ảnh thì dùng ảnh gốc
                            name: spot.name,
                            description: spot.description
                        });
                    }}
                  >
                    {spot.image && (
                      <Image source={{ uri: spot.image }} style={styles.spotImage} />
                    )}
                    <View style={styles.spotContent}>
                      <Text style={styles.spotName}>{spot.name}</Text>
                      <Text style={styles.spotDesc} numberOfLines={2}>{spot.description}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2,
  },
  coverImage: {
    width: width,
    height: height * 0.35,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  ratingBadge: {
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFB020',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
  },
  infoGrid: {
    marginVertical: 20,
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
  },
  infoCard: {},
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.Primary500 || '#007AFF',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  spotsSection: {
    marginTop: 10,
  },
  spotCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  spotImage: {
    width: 100,
    height: 100,
  },
  spotContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  spotName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  spotDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});