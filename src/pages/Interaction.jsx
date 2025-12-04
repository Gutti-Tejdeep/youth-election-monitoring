import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Avatar, ListItemAvatar } from '@mui/material';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

function Interaction() {
  const { interactions, addInteraction } = useData();
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const handlePost = () => {
    if (!message.trim()) return;

    const newMsg = {
      id: `I-${Date.now()}`,
      userEmail: user?.email || 'anonymous',
      username: user?.displayName || (user?.email ? user.email.split('@')[0] : 'Anonymous'),
      message: message.trim(),
      createdAt: new Date().toLocaleString()
    };

    addInteraction(newMsg);
    setMessage('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Interaction Area
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            minRows={2}
          />
          <Button variant="contained" onClick={handlePost} disabled={!message.trim()}>
            Post
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Interactions
        </Typography>

        {(!interactions || interactions.length === 0) ? (
          <Typography color="textSecondary">No interactions yet</Typography>
        ) : (
          <List>
            {interactions.map((it) => (
              <ListItem key={it.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{(it.username || it.userEmail || 'A')[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={it.username}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {it.message}
                      </Typography>
                      <br />
                      <Typography component="span" variant="caption" color="textSecondary">
                        {it.createdAt}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}

export default Interaction;
