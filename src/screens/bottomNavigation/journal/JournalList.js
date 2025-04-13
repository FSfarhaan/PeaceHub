// screens/JournalList.js
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const JournalList = ({ navigation }) => {

    const [selectedCategory, setSelectedCategory] = useState('This week');

    const notes = [
        {
            id: '1',
            title: 'Reading notes',
            date: '10.21.21',
            content: 'Use a calendar for publishing on social media. For example, a photo on Monday, a question on Tuesday, information the next day...'
        },
        {
            id: '2',
            title: 'Movies to see',
            date: '10.17.21',
            content: 'Here are 101 movies everyone should watch once. I believe there\'s a mix of movies to see here which attracts us more than others. Here\'s my top 5 screen plot twist, and you...'
        },
        {
            id: '3',
            title: 'Things to buy',
            date: '10.12.21',
            content: '- Clothes for winter because it\'s cold out here\n- Take a look for some car my driving gonna be better than before\n- Some groceries, because they are cheaper than...'
        },
        {
            id: '4',
            title: 'Books to read',
            date: '10.09.21',
            content: 'Here is the booklist, continue...'
        },
        {
            id: '5',
            title: 'Website UI',
            date: '10.03.21',
            content: 'There is Beautiful website...'
        },
        {
            id: '6',
            title: "Anne's birthday",
            date: '09.30.21',
            content: "For Anne's Birthday, Sarah would all things like that. It was a birthday party at the park where they buy some food, begin to organize the list for her to organize everything."
        },
        {
            id: '7',
            title: 'Grocery list',
            date: '09.29.21',
            content: "- Pasta - this is a great basic\n- Rice - another great meal\n- Coconut oil and spices\n- Avocado - for healthy fats\n- Bread - great for sandwiches"
        },
        {
            id: '8',
            title: 'Meeting startup',
            date: '09.24.21',
            content: "James begin the meeting with introduction with a warm welcome. Meeting everybody about the users who business. We are ready to know how much money we are missing big."
        }
    ];

    const options = ["This week", "This month", "This year"];

    const NoteCard = ({ note }) => (
        <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteDate}>{note.date}</Text>
            <Text style={styles.noteContent} numberOfLines={4}>{note.content}</Text>
        </View>
    );

    const renderCategoryButton = (category) => {
        const isSelected = category === selectedCategory;
        return (
            <TouchableOpacity
                key={category}
                style={[
                    styles.categoryButton,
                    isSelected && { backgroundColor: '#8E67FD' }
                ]}
                onPress={() => setSelectedCategory(category)}
            >
                <Text style={[
                    styles.categoryText,
                    isSelected && { color: 'white' }
                ]}>
                    {category}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                />
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                {options.map(category => renderCategoryButton(category))}
            </ScrollView>


            <ScrollView>
                <View style={styles.notesGrid}>
                    {notes.map(note => (
                        <TouchableOpacity
                            key={note.id}
                            style={styles.noteCardContainer}
                            onPress={() => navigation.navigate('NoteScreen', { noteId: note.id, title: note.title, content: note.content })}
                        >
                            <NoteCard note={note} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NoteScreen', { isNewNote: true })}
            >
                <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    categoriesContainer: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 6,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    searchInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    notesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
    },
    noteCardContainer: {
        width: '50%',
        padding: 8,
    },
    noteCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        height: 150,
        borderWidth: .1,
        borderColor: "#333"
    },
    noteTitle: {
        color: '#D473D4',
        fontWeight: 'bold',
        marginBottom: 2,
        fontSize: 16,
    },
    noteDate: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 8,
    },
    noteContent: {
        fontSize: 14,
        color: '#555',
    },
    addButton: {
        position: 'absolute',
        right: 40,
        bottom: 40,
        backgroundColor: '#8E67FD',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default JournalList;