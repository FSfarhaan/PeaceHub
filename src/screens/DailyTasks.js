import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DailyTasks = () => {
  const [timeLeft, setTimeLeft] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Drink 3 glasses of water', completed: 0, total: 3, icon: 'cup-water', reward: '💧 Hydration Hero! +10 points' },
    { id: 2, name: 'Go for a 5 min walk', completed: 0, total: 1, icon: 'walk', reward: '🚶 Step Master! +15 points' },
    { id: 3, name: 'Read 1 page', completed: 0, total: 1, icon: 'book-open-page-variant', reward: '📚 Knowledge Seeker! +10 points' },
  ]);
  const [streakDays, setStreakDays] = useState(3);
  const [totalPoints, setTotalPoints] = useState(100);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState('');
  const [allCompletedReward, setAllCompletedReward] = useState(false);
  
  // Animation values
  const rewardScale = useState(new Animated.Value(0))[0];
  const rewardOpacity = useState(new Animated.Value(0))[0];
  const confettiOpacity = useState(new Animated.Value(0))[0];

  // Calculate time left until next day
  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check if all tasks are completed
  useEffect(() => {
    const allCompleted = tasks.every(task => task.completed >= task.total);
    if (allCompleted && !allCompletedReward) {
      setAllCompletedReward(true);
      // Delay to let the last task reward animation finish
      setTimeout(() => {
        showRewardAnimation('🏆 All Tasks Completed! +50 BONUS POINTS! 🎉', true);
        setTotalPoints(prev => prev + 50);
        setStreakDays(prev => prev + 1);
      }, 1000);
    }
  }, [tasks]);

  // Animate reward popup
  const showRewardAnimation = (rewardText, isSpecial = false) => {
    setCurrentReward(rewardText);
    setShowReward(true);
    
    Animated.sequence([
      Animated.parallel([
        Animated.timing(rewardScale, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.elastic(1),
        }),
        Animated.timing(rewardOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rewardScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // If it's a special reward (all tasks completed), show confetti
    if (isSpecial) {
      Animated.timing(confettiOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Hide confetti after some time
      setTimeout(() => {
        Animated.timing(confettiOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 3000);
    }

    // Hide reward after some time
    setTimeout(() => {
      Animated.timing(rewardOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowReward(false);
        rewardScale.setValue(0);
      });
    }, 2000);
  };

  // Progress calculation
  const calculateProgress = () => {
    const completedCount = tasks.reduce((sum, task) => sum + (task.completed >= task.total ? 1 : 0), 0);
    return (completedCount / tasks.length) * 100;
  };

  const progress = calculateProgress();

  // Handle task completion
  const handleTaskProgress = (taskId) => {
    let pointsToAdd = 0;
    let rewardText = '';

    setTasks(prev => prev.map(task => {
      if (task.id === taskId && task.completed < task.total) {
        const newCompleted = task.completed + 1;
        if (newCompleted >= task.total) {
          // Task just completed
          pointsToAdd = task.id === 2 ? 15 : 10; // 15 points for walking, 10 for others
          rewardText = task.reward;
          setTimeout(() => showRewardAnimation(rewardText), 100);
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    }));

    if (pointsToAdd > 0) {
      setTotalPoints(prev => prev + pointsToAdd);
    }
  };

  // Render confetti
  const renderConfetti = () => {
    const confetti = [];
    const colors = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff'];
    
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 8 + 5;
      confetti.push(
        <View
          key={i}
          style={{
            position: 'absolute',
            top: Math.random() * 300,
            left: Math.random() * 300,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            transform: [
              { translateX: Math.random() * 100 - 50 },
              { translateY: Math.random() * 100 - 50 },
            ],
          }}
        />
      );
    }
    
    return confetti;
  };

  return (
    <View style={styles.container}>
      {/* Animated Reward */}
      {showReward && (
        <Animated.View 
          style={[
            styles.rewardContainer,
            { 
              opacity: rewardOpacity,
              transform: [{ scale: rewardScale }] 
            }
          ]}
        >
          <Text style={styles.rewardText}>{currentReward}</Text>
        </Animated.View>
      )}

      {/* Confetti Animation */}
      <Animated.View style={[styles.confettiContainer, { opacity: confettiOpacity }]}>
        {renderConfetti()}
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Health</Text>
        <Text style={styles.refreshText}>Refresh in: {timeLeft}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <LinearGradient
          colors={['#4a90e2', '#63d9ff']}
          style={styles.progressBar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.milestones}>
            <View style={[styles.milestone, progress >= 33 ? styles.milestoneActive : {}]}>
              <Text style={styles.milestoneText}>33%</Text>
              {progress >= 33 && <Text style={styles.milestoneEmoji}>🎯</Text>}
            </View>
            <View style={[styles.milestone, progress >= 66 ? styles.milestoneActive : {}]}>
              <Text style={styles.milestoneText}>66%</Text>
              {progress >= 66 && <Text style={styles.milestoneEmoji}>🚀</Text>}
            </View>
            <View style={[styles.milestone, progress >= 100 ? styles.milestoneActive : {}]}>
              <Text style={styles.milestoneText}>100%</Text>
              {progress >= 100 && (
                <MaterialCommunityIcons name="trophy" size={24} color="#FFD700" style={styles.trophyIcon} />
              )}
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Tasks */}
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskContainer}>
          <View style={styles.taskIconContainer}>
            <MaterialCommunityIcons name={task.icon} size={24} color="#4a90e2" />
          </View>
          <View style={styles.taskDetails}>
            <Text style={styles.taskName}>{task.name}</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(task.completed / task.total) * 100}% `}
                ]}
              />
            </View>
            <Text style={styles.taskProgress}>
              {task.completed}/{task.total}
            </Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.advanceButton, 
              task.completed >= task.total ? styles.completedButton : {}
            ]}
            onPress={() => handleTaskProgress(task.id)}
            disabled={task.completed >= task.total}
          >
            <Text style={styles.advanceButtonText}>
              {task.completed >= task.total ? '✅ Done!' : 'Mark'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Streak Information */}
      <View style={styles.streakContainer}>
        <MaterialCommunityIcons name="fire" size={24} color="#ff6b6b" />
        <Text style={styles.streakText}>Streak: {streakDays} days 🔥</Text>
        <Text style={styles.pointsText}>{totalPoints} points ⭐</Text>
      </View>

      {/* Daily Motivation */}
      <View style={styles.motivationContainer}>
        <Text style={styles.motivationText}>
          "Small daily improvements lead to amazing results!" 💪
        </Text>
      </View>

      {/* Navigation */}
      {/* <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Monthly</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  refreshText: {
    fontSize: 16,
    color: '#333',
  },
  progressContainer: {
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    position: 'relative',
  },
  milestones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: '100%',
    alignItems: 'center',
  },
  milestone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneActive: {
    backgroundColor: '#FFD700',
  },
  milestoneText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  milestoneEmoji: {
    position: 'absolute',
    top: -20,
    fontSize: 20,
  },
  trophyIcon: {
    position: 'absolute',
    top: -20,
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskDetails: {
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4a90e2',
    borderRadius: 4,
  },
  taskProgress: {
    fontSize: 12,
    color: '#666',
  },
  advanceButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 12,
  },
  completedButton: {
    backgroundColor: '#8bc34a',
  },
  advanceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '500',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  motivationContainer: {
    backgroundColor: '#FFF0C9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  motivationText: {
    fontStyle: 'italic',
    color: '#8b4513',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#8b4513',
    borderRadius: 10,
    padding: 12,
    marginTop: 'auto',
  },
  navButton: {
    paddingHorizontal: 16,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  rewardContainer: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    borderRadius: 20,
    padding: 16,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  rewardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#8b4513',
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    pointerEvents: 'none',
  },
});

export default DailyTasks;