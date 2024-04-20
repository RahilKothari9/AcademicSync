import { Button, Card, Divider, Input, List, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;

const Profile = () => {
  const [experience, setExperience] = useState(['Company A - Position A', 'Company B - Position B']);
  const [education, setEducation] = useState('Your Education Details');
  const [newExperience, setNewExperience] = useState('');
  const [newEducation, setNewEducation] = useState('');

  const addExperience = () => {
    setExperience([...experience, newExperience]);
    setNewExperience('');
  };

  const editEducation = () => {
    setEducation(newEducation);
    setNewEducation('');
  };

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', marginTop: 50, padding: 20,}}>
      {/* ... */}
      <Card title="Experience" style={{ marginBottom: 20 }}>
        <List
          dataSource={experience}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
        />
        <Input value={newExperience} onChange={e => setNewExperience(e.target.value)} placeholder="Add new experience" />
        <Button onClick={addExperience}>Add Experience</Button>
      </Card>
      {/* ... */}
      <Divider orientation="left">Education</Divider>
      <Card style={{ marginBottom: 20 }}>
        <Paragraph>{education}</Paragraph>
        <Input value={newEducation} onChange={e => setNewEducation(e.target.value)} placeholder="Edit education" />
        <Button onClick={editEducation}>Edit Education</Button>
      </Card>
      {/* ... */}
      <Divider orientation="left">Contact Information</Divider>
      <Card style={{ marginBottom: 20 }}>
        <Paragraph>Your Contact Information</Paragraph>
      </Card>
    </div>
  );
};

export default Profile;