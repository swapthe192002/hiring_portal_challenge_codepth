import React, { useState, useEffect } from 'react'; 
import { initializeApp } from 'firebase/app'; 
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import React, { useState, useEffect } from 'react';
// import { firebase } from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQSlUQLgRoD6BGWOjdizyspDPyInm-EgM",
    authDomain: "online-job-portal-5129d.firebaseapp.com",
    projectId: "online-job-portal-5129d",
    storageBucket: "online-job-portal-5129d.appspot.com",
    messagingSenderId: "518293502192",
    appId: "1:518293502192:web:5fe47a4fcfa1372b6eea35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

const JobPostForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [postedOn, setPostedOn] = useState(new Date());
  const [skills, setskills] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [jobs, setJobs] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
        try {
          // Fetch job data from Firestore
          const snapshot = await db.collection('jobs').get();
  
          // Map the documents to an array of job objects
          const jobsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
          // Set the state with the fetched jobs
          setJobs(jobsData);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };
  
      // Call the fetchJobs function when the component mounts
      fetchJobs();
  }, []);

  const handlePostButton = () => {
    setShowForm(!showForm);
  };

  const handleSubmitPost = async () => {
    try {
      // Add job post to Firestore
      await db.collection('jobs').add({
        title: title,
        location: location,
      });

      // Update notification state
      setNotification('Job post added successfully');

      // Reset form
      setTitle('');
      setLocation('');

      // Hide the form
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting job post:', error);
      setNotification('Error adding job post');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <button
        onClick={handlePostButton}
        className="bg-blue-500 text-white px-4 py-2 rounded-md justify-end"
      >
        Create Job Post
      </button>
      {showForm && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <input
            type="date"
            placeholder="PostedOn"
            value={postedOn}
            onChange={(e) => setPostedOn(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          {/* <input
            type="array"
            placeholder="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border p-2 mb-2"
          /> */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 mb-2"
          />
          
          <button
            onClick={handleSubmitPost}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Submit Post
          </button>
        </div>
      )}

{notification && <p className="text-green-500">{notification}</p>}

<div className="mt-4">
  <h2 className="text-xl font-bold mb-2">Job List</h2>
  <ul>
    {jobs.map((job) => (
      <li key={job.id} className="mb-2">
        <strong>{job.title}</strong>: {job.location}
      </li>
    ))}
  </ul>
</div>
    </div>
  );
};

export default JobPostForm;
