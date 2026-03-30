
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

type InterventionRoute = {
  params?: {
    app?: string;
  };
};

const getAppName = (packageName: string): string => {
  const appNames: { [key: string]: string } = {
    'com.android.chrome': 'Chrome',
    'com.facebook.katana': 'Facebook',
    'com.instagram.android': 'Instagram',
    'com.snapchat.android': 'Snapchat',
    'com.reddit.frontpage': 'Reddit',
    'com.twitter.android': 'Twitter',
  };
  return appNames[packageName] || packageName;
};

export default function Intervention() {
  const route = useRoute<InterventionRoute>();
  const navigation = useNavigation();
  const { backgroundColor } = useTheme();
  const appPackage = route.params?.app || 'Unknown App';
  const appName = getAppName(appPackage);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>⏰ Time Limit Exceeded</Text>
        </View>

        {/* Main Message */}
        <View style={styles.card}>
          <Text style={styles.appName}>{appName}</Text>
          <Text style={styles.message}>
            You've reached your daily usage limit for this app.
          </Text>
        </View>

        {/* Why This Matters */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Why This Matters</Text>
          <Text style={styles.sectionText}>
            Your Digital Twin is helping you maintain a healthier balance between your digital and physical life. By respecting these limits, you're:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>✓ Improving focus and productivity</Text>
            <Text style={styles.bullet}>✓ Protecting your mental health</Text>
            <Text style={styles.bullet}>✓ Building better digital habits</Text>
            <Text style={styles.bullet}>✓ Spending more time with what matters</Text>
          </View>
        </View>

        {/* What to Do Next */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What Now?</Text>
          <Text style={styles.sectionText}>
            You can:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Take a break and do something offline</Text>
            <Text style={styles.bullet}>• Adjust your limits tomorrow in Settings</Text>
            <Text style={styles.bullet}>• Return to your other apps</Text>
          </View>
        </View>

        {/* Try Later */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Try Again Tomorrow</Text>
          <Text style={styles.sectionText}>
            Your {appName} usage limit will reset at midnight. Until then, consider spending time on more fulfilling activities.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 120,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#21262d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#f85149',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f85149',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#c9d1d9',
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#8b949e',
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletList: {
    marginLeft: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#c9d1d9',
    lineHeight: 24,
    marginBottom: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#161b22',
    borderTopWidth: 1,
    borderTopColor: '#30363d',
  },
  button: {
    backgroundColor: '#238636',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});