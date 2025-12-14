import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import { CHCListProps } from '../type';
import { CHCText } from '../core/CHCText';
import Colors from '../../../theme/colors';

export function CHCList<T>({ isLoading, data, emptyText = 'Không có dữ liệu', ...props }: CHCListProps<T>) {
  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.Primary500} style={styles.loader} />;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item: any) => item?.id?.toString() || Math.random().toString()}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <CHCText color={Colors.Gray500}>{emptyText}</CHCText>
        </View>
      }
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
});