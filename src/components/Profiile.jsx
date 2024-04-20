import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Image, Input, List, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;

const Profile = ({ name = 'John Doe', surname = '', headline = '', ...otherProps }) => {
  const [experience, setExperience] = useState(['Company A - Position A', 'Company B - Position B']);
  const [education, setEducation] = useState(['Your Education Details']);
  const [newExperience, setNewExperience] = useState('');
  const [newEducation, setNewEducation] = useState('');

  const addExperience = () => {
    setExperience([...experience, newExperience]);
    setNewExperience('');
  };

  const deleteExperience = index => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([...education, newEducation]);
    setNewEducation('');
  };

  const deleteEducation = index => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: 20, backgroundColor: 'yourBackgroundColor' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Image width={180} src="https://zos.alipay.com/v2/avatar_signin.svg" alt="Profile Picture" /> {/* Replace with actual image URL */}
          <Title level={4}>{name}</Title>
          <Paragraph>{headline}</Paragraph>
          <Button type="primary">Connect</Button>
          <Space direction="vertical" size={8}>
            {/* Add buttons for endorsements and recommendations (optional) */}
          </Space>
        </Col>
        <Col span={16}>
          {/* Experience, Education, Contact Information sections */}
          <Card title="Experience" style={{ marginBottom: 20, backgroundColor: 'yourBackgroundColor' }} bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={experience}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item}
                  />
                  <Button onClick={() => deleteExperience(index)}>Delete</Button>
                </List.Item>
              )}
            />
            <Input.Group compact>
              <Input.TextArea
                value={newExperience}
                onChange={(e) => setNewExperience(e.target.value)}
                placeholder="Add new experience"
                autoSize={{ minRows: 2, maxRows: 4 }}
                style={{ width: 'calc(100% - 80px)' }}
              />
              <Button type="primary" onClick={addExperience} disabled={!newExperience}>
                Add Experience
              </Button>
            </Input.Group>
          </Card>

          <Divider orientation="left">Education</Divider>

          <Card title="Education" style={{ marginBottom: 20, backgroundColor: 'yourBackgroundColor' }} bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={education}
              renderItem={(item, index) => (
                <List.Item>
                  <Paragraph>{item}</Paragraph>
                  <Button onClick={() => deleteEducation(index)}>Delete</Button>
                </List.Item>
              )}
            />
            <Input.Group compact>
              <Input.TextArea
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                placeholder="Add new education"
                autoSize={{ minRows: 2, maxRows: 4 }}
                style={{ width: 'calc(100% - 80px)' }}
              />
              <Button type="primary" onClick={addEducation} disabled={!newEducation}>
                Add Education
              </Button>
            </Input.Group>
          </Card>

          <Divider orientation="left">Contact Information</Divider>

          <Card title="Contact Information" style={{ marginBottom: 20, backgroundColor: 'yourBackgroundColor' }} bordered={false}>
            <Paragraph>Your Contact Information (Edit this section)</Paragraph>
            {/* Add form or list for contact details */}
          </Card>
        </Col>
      </Row>

      {/* Optional sections for Skills, Accomplishments, Projects, etc. */}
      <Divider />
      {/* ... (optional sections) */}
    </div>
  );
};

export default Profile;