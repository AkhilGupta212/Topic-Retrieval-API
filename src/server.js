const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const server = express();
const serverPort = 3000;
const topicsFilePath = path.join(__dirname, '..', 'data', 'topics.json');

// Getting data form file
const fetchTopicData = async () => {
  const fileContent = await fs.readFile(topicsFilePath, 'utf8');
  return JSON.parse(fileContent);
};

// filtter topicG
server.get('/api/topics', async (request, response) => {
  try {
    const { search: searchQuery, sort: sortOption } = request.query;
    
    // validate search parameter
    if (searchQuery === undefined) {
      return response.status(400).json({ error: "Search parameter is required" });
    }
    
    const trimmedQuery = String(searchQuery).trim();
    if (trimmedQuery.length === 0) {
      return response.status(400).json({ error: "Search parameter cannot be empty" });
    }
    
    const normalizedQuery = trimmedQuery.toLowerCase();
    const allTopics = await fetchTopicData();
    
    if (!Array.isArray(allTopics)) {
      return response.status(500).json({ error: 'Data format error: array expected' });
    }
    
    // applying filtering on data
    const matchingTopics = allTopics.filter(topic => {
      if (!topic?.name) return false;
      const topicName = String(topic.name).toLowerCase();
      return topicName.includes(normalizedQuery);
    });
    
    // sorting data
    let finalResults = matchingTopics;
    if (sortOption === 'name') {
      finalResults = [...matchingTopics].sort((topicA, topicB) => {
        const nameA = String(topicA.name).toLowerCase();
        const nameB = String(topicB.name).toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }
    
    const formattedResults = finalResults.map(topic => ({
      id: topic.id,
      name: topic.name,
      category: topic.category
    }));
    
    return response.status(200).json(formattedResults);
  } catch (error) {
    console.error('Error processing request:', error);
    return response.status(500).json({ error: 'Server encountered an error' });
  }
});

server.get('/', (request, response) => {
  response.send('API service is running');
});

server.listen(serverPort, () => {
  console.log(`Server is active on port ${serverPort}`);
});