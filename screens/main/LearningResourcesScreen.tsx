import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// Expanded content structure
interface Resource {
  id: string;
  title: string;
  category: string; // e.g., "Conversation Starters", "Confidence"
  details: string[]; // Array of tips or points
}

const learningContent: Resource[] = [
  {
    id: '1',
    title: 'Effective Conversation Starters',
    category: 'Communication',
    details: [
      "Observation-based: \"This place has a great vibe, have you been here before?\" or \"I love the music they're playing, do you know this artist?\"",
      "Situational: \"Quite a queue today, huh? Waiting for anything special?\" (if in a line), or \"This coffee is amazing, any recommendations for next time?\" (at a cafe).",
      "Shared experience: \"This event is pretty cool, what brought you here today?\" or \"What do you think of the speaker/performance so far?\"",
      "Simple & Direct (use with good judgment and a friendly demeanor): \"Hi, I'm [Your Name]. I saw you from across the room and wanted to say hello.\"",
      "Tip: Follow up with open-ended questions (who, what, where, when, why, how) to encourage more than a yes/no answer."
    ]
  },
  {
    id: '2',
    title: 'Building Confidence & Positive Mindset',
    category: 'Mindset',
    details: [
      "Body Language: Stand tall, shoulders back, make eye contact (not staring!), and offer a genuine smile. Confident posture can influence how you feel.",
      "Positive Self-Talk: Replace negative thoughts (\"What if I get rejected?\") with positive or neutral ones (\"I'm just going to say hi and see what happens.\").",
      "Focus on the Process, Not Outcome: The goal is to practice initiating, not necessarily to get a number every time. Each interaction is a learning experience.",
      "Small Steps: Start with low-pressure interactions, like asking for the time or a simple direction, to build comfort.",
      "Remember Your Value: You have unique qualities and interests. Be authentic."
    ]
  },
  {
    id: '3',
    title: 'Active Listening: Key to Connection',
    category: 'Communication',
    details: [
      "Be Present: Put away your phone and distractions. Focus on what they're saying.",
      "Nod and Use Affirmations: Small cues like nodding, \"uh-huh\", or \"I see\" show you're engaged.",
      "Ask Clarifying Questions: \"So, what you're saying is...?\" or \"Can you tell me more about that?\"",
      "Reflect & Summarize: Briefly summarizing their points shows you understand and value their input.",
      "Share Related Thoughts (briefly): Don't just interrogate. Offer your own relevant experiences or thoughts to create a two-way street."
    ]
  },
  {
    id: '4',
    title: 'Making a Graceful Exit',
    category: 'Social Skills',
    details: [
      "Be Polite: \"It was really nice talking to you, [Their Name]. I have to get going, but I hope you enjoy the rest of your time here!\"",
      "State Your Intention (Optional): \"I'm heading off to meet some friends/grab another drink/etc.\"",
      "Offer to Connect (If appropriate and genuine): \"I'd love to continue this conversation sometime. Would you be open to exchanging numbers/socials?\"",
      "Don't Overstay: If the conversation lulls or you sense it's a good closing point, don't force it.",
      "Positive Closing: End with a smile and a warm goodbye."
    ]
  },
  {
    id: '5',
    title: 'General Approach Tips',
    category: 'Strategy',
    details: [
      "Read the Room: Be aware of social cues. Is she busy, engaged in a deep conversation, or looking stressed? If so, it might not be the best time.",
      "Be Respectful of Space: Don't be physically imposing. Approach from the side or front, not directly from behind.",
      "Keep it Light & Positive: Humor (if natural) and a friendly attitude go a long way.",
      "Genuine Compliments: If you offer a compliment, make it specific and sincere, focusing on something non-physical like their style, energy, or something they said.",
      "Accept Rejection Gracefully: Not every interaction will lead to a long conversation or a date. If she's not interested, respect that and move on politely. Don't take it personally."
    ]
  },
  // TODO: Add more curated content, potentially fetched from Firestore
  // TODO: Implement progress-based content unlocks if required
];

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TouchableOpacity style={styles.resourceItem} onPress={() => setExpanded(!expanded)}>
      <Text style={styles.resourceTitle}>{resource.title}</Text>
      <Text style={styles.resourceCategory}>{resource.category}</Text>
      {expanded && (
        <View style={styles.detailsContainer}>
          {resource.details.map((detail, index) => (
            <Text key={index} style={styles.detailText}>• {detail}</Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const LearningResourcesScreen = ({ navigation }: any) => {
  // const openResource = (item: any) => { // Old function, replaced by card expansion
  //   console.log('Opening resource:', item.title);
  //   // TODO: Navigate to a detailed view for the resource or play video
  // };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Learning & Resources</Text>
        {learningContent.map(item => (
          // <TouchableOpacity key={item.id} style={styles.resourceItem} onPress={() => openResource(item)}>
          //   <Text style={styles.resourceTitle}>{item.title}</Text>
          //   <Text style={styles.resourceType}>{item.type.replace('_', ' ')}</Text>
          // </TouchableOpacity>
          <ResourceCard key={item.id} resource={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  resourceItem: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  resourceTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600', // Made title a bit bolder
    marginBottom: 3, // Added some space below title
  },
  resourceCategory: { // New style for category
    fontSize: 13,
    color: '#bbbbbb',
    fontStyle: 'italic',
    marginBottom: 10, // Space before details if expanded
  },
  detailsContainer: { // New style for the details view
    marginTop: 10,
    paddingLeft: 5,
  },
  detailText: { // New style for each detail item
    fontSize: 15,
    color: '#e0e0e0',
    marginBottom: 8,
    lineHeight: 20, // Improved readability
  },
});

export default LearningResourcesScreen; 