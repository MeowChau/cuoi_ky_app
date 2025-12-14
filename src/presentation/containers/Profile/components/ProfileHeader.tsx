import React from 'react';
import { View } from 'react-native';
import { CHCText } from '../../../components';
import { User } from '../../../../domain/entities/User';
import { profileStyles } from '../styles';
import Colors from '../../../../theme/colors';

interface ProfileHeaderProps {
  user: User | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  if (!user) {
    return (
      <View style={profileStyles.headerSection}>
        <View style={profileStyles.avatarContainer}>
          <View style={profileStyles.avatar}>
            <CHCText type="Heading1">👤</CHCText>
          </View>
          <CHCText type="Heading3" style={profileStyles.userName}>
            Chưa đăng nhập
          </CHCText>
        </View>
      </View>
    );
  }

  // Get first letter of name for avatar
  const firstLetter = user.name?.charAt(0).toUpperCase() || '?';

  return (
    <View style={profileStyles.headerSection}>
      <View style={profileStyles.avatarContainer}>
        <View style={profileStyles.avatar}>
          <CHCText type="Heading1" color={Colors.Primary500}>
            {firstLetter}
          </CHCText>
        </View>
        <CHCText type="Heading2" style={profileStyles.userName}>
          {user.name}
        </CHCText>
        <CHCText type="Body2" color={Colors.Gray500} style={profileStyles.userPhone}>
          {user.phone}
        </CHCText>
        <CHCText type="Body1" color={Colors.Gray400} style={profileStyles.userPhone}>
          {user.email}
        </CHCText>
      </View>
    </View>
  );
};