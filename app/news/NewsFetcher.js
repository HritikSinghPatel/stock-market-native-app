// NewsFetcher.js

import NewsList from './NewsList';
import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const BASE_URL = 'https://api.iex.cloud/v1';
const API_KEY = 'pk_9e697d85bc3446ba8c552b18e85ff4bc';

const NewsFetcher = ({ symbol }) => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/data/core/news/aapl?range=last-week&token=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }

        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching news data:', error.message);
      }
    };

    fetchNewsData();
  }, [symbol]);

  return (
    <View style={styles.newsFetcherContainer}>
      {newsData.length > 0 ? (
        <NewsList articles={newsData} />
      ) : (
        <Text>Loading news in few seconds...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  newsFetcherContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});


export default NewsFetcher;
