import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db';
import partnerRoutes from './routes/partnerRoutes';
import coreRoutes from './routes/coreRoutes';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
});

// ─── Middleware ───────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

// ─── Routes ──────────────────────────────────────────
app.use('/api', partnerRoutes);
app.use('/api/core', coreRoutes);

// ─── Health Check ────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'FoodieDash API',
    timestamp: new Date().toISOString(),
  });
});

// ─── Socket.io ───────────────────────────────────────
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ─── Start ───────────────────────────────────────────
const startServer = async (): Promise<void> => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`\n🚀 FoodieDash API running on http://localhost:${PORT}`);
    console.log(`📡 Health: http://localhost:${PORT}/api/health`);
    console.log(`🛵 Core API: http://localhost:${PORT}/api/core`);
  });
};

startServer();
