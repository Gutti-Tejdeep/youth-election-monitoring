import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Grid,
  Chip
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
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
      <Box className="slide-in-right" sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>💬</span>
          Community Interaction
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.85)',
            mt: 1,
            ml: 7,
            fontWeight: 500,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          Connect, discuss, and share updates with the community
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Post Composition Area */}
        <Grid item xs={12} md={4}>
          <Paper
            className="premium-card slide-in-up stagger-1"
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'var(--primary-700)',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Box component="span" sx={{
                p: 0.5,
                borderRadius: '8px',
                background: 'rgba(102, 126, 234, 0.1)',
                display: 'flex'
              }}>
                <ForumIcon sx={{ color: 'var(--primary-600)' }} />
              </Box>
              Start a Discussion
            </Typography>

            <TextField
              label="Share your thoughts..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Type your message here..."
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                  background: 'rgba(102, 126, 234, 0.03)',
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.06)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-500)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--primary-600)',
                    borderWidth: '2px',
                  }
                }
              }}
            />

            <Button
              variant="contained"
              onClick={handlePost}
              disabled={!message.trim()}
              fullWidth
              startIcon={<SendIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
                },
                '&:disabled': {
                  background: 'rgba(0,0,0,0.12)',
                  color: 'rgba(0,0,0,0.26)'
                }
              }}
            >
              Post Message
            </Button>
          </Paper>
        </Grid>

        {/* Message Feed */}
        <Grid item xs={12} md={8}>
          <Paper
            className="premium-card slide-in-up stagger-2"
            sx={{
              p: 3,
              minHeight: 500,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Recent Discussions
              </Typography>
              <Chip
                label={`${interactions.length} Messages`}
                size="small"
                sx={{
                  background: 'rgba(48, 207, 208, 0.1)',
                  color: '#330867',
                  fontWeight: 600
                }}
              />
            </Box>

            {(!interactions || interactions.length === 0) ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 80, color: 'var(--neutral-300)', mb: 2, opacity: 0.5 }} />
                <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 600 }}>
                  No interactions yet
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Be the first to start a conversation!
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {interactions.map((it, index) => (
                  <ListItem
                    key={it.id}
                    alignItems="flex-start"
                    className={`scale-in stagger-${Math.min(index + 1, 5)}`}
                    sx={{
                      mb: 2,
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
                      border: '1px solid rgba(255,255,255,0.5)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                      }
                    }}
                  >
                    <ListItemAvatar sx={{ mt: 0.5 }}>
                      <Avatar sx={{
                        background: `linear-gradient(135deg, 
                          hsl(${(index * 50) % 360}, 70%, 60%) 0%, 
                          hsl(${(index * 50 + 40) % 360}, 70%, 40%) 100%)`,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                      }}>
                        {(it.username || it.userEmail || 'A')[0].toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                            {it.username}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                            {it.createdAt}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'var(--text-secondary)',
                            lineHeight: 1.6
                          }}
                        >
                          {it.message}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Interaction;
