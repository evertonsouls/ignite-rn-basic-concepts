import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import { Button } from '../components/Button';
import { SkillCard, SkillData } from '../components/SkillCard';

export function Home() {
  const [greeting, setGreeting] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);

  useEffect(() => {
    const time = new Date();
    const hours = time.getHours();
    
    if (hours < 12) {
      setGreeting('Good morning');
    }
    else if (hours >= 12 && hours <= 18) {
      setGreeting('Good afternoon');
    }
    else {
      setGreeting('Good night')
    }
  }, [])

  function handleAddNewSkill() {
    if (newSkill) {
      const data = {
        id: String(new Date().getTime()),
        name: newSkill,
      }

      setMySkills(oldState => [...oldState, data]);
      setNewSkill('');
    }
  }

  function removeSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Everton</Text>
      <Text style={styles.subtitle}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
        value={newSkill}
      />

      <Button 
        title="Add"
        onPress={handleAddNewSkill} 
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard skill={item} onPress={() => removeSkill(item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#fff',
    fontSize: 16
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  }
})