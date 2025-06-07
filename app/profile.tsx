import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Camera, MapPin, Briefcase, GraduationCap } from 'lucide-react-native';

interface UserProfile {
  id: string;
  name: string;
  age: number;
  distance: string;
  occupation: string;
  education: string;
  photo: string;
  bio: string;
}

const sampleUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex',
  age: 29,
  distance: '3 miles away',
  occupation: 'Software Engineer',
  education: 'University of Washington',
  photo: 'https://images.unsplash.com/photo-1539571696357-433388fd17ea?w=400&h=600&fit=crop',
  bio: 'Building cool things and exploring the outdoors. Coffee lover and avid reader. Let's connect! 🚀',
};

export default function Profile() {
  const userProfile = sampleUserProfile;

  return (
    <LinearGradient
      colors={['#FF6B5F', '#FF8A80', '#FFAB91']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileCard}>
            <View style={styles.imageContainer}>
              {userProfile.photo ? (
                <Image source={{ uri: userProfile.photo }} style={styles.profileImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <User color="#FF6B5F" size={80} />
                </View>
              )}
              <TouchableOpacity style={styles.cameraButton}>
                <Camera color="#FFFFFF" size={16} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.name}>{userProfile.name}, {userProfile.age}</Text>
            
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <MapPin color="#FF6B5F" size={16} />
                <Text style={styles.infoText}>{userProfile.distance}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <Briefcase color="#FF6B5F" size={16} />
                <Text style={styles.infoText}>{userProfile.occupation}</Text>
              </View>
              
              <View style={styles.infoItem}>
                <GraduationCap color="#FF6B5F" size={16} />
                <Text style={styles.infoText}>{userProfile.education}</Text>
              </View>
            </View>
            
            <View style={styles.bioSection}>
              <Text style={styles.bioTitle}>About Me</Text>
              <Text style={styles.bioText}>
                {userProfile.bio}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF6B5F',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FF6B5F',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FF6B5F',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#3C3C43',
    marginLeft: 12,
  },
  bioSection: {
    marginBottom: 24,
  },
  bioTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 16,
    color: '#3C3C43',
    lineHeight: 24,
  },
  editButton: {
    backgroundColor: '#FF6B5F',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});