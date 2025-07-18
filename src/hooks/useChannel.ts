import { useState, useCallback, useEffect } from "react";
import { ApiService } from "../services/api";
import type { Channel, Snap, User } from "../types";

export const useChannel = (channelId?: number) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [snaps, setSnaps] = useState<Snap[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const loadChannel = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.getChannel(id);
      setChannel(response.data);
      
      // Load channel's snaps
      const snapsResponse = await ApiService.getSnaps();
      const channelSnaps = snapsResponse.data.filter(snap => snap.channelId === id);
      setSnaps(channelSnaps);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load channel");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createChannel = useCallback(async (data: {
    name: string;
    avatar: string;
    instruction: string;
  }): Promise<Channel | null> => {
    try {
      const response = await ApiService.createChannel(data);
      setChannel(response.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create channel");
      return null;
    }
  }, []);

  const updateChannel = useCallback(async (
    id: number,
    data: Partial<Channel>
  ): Promise<Channel | null> => {
    try {
      const response = await ApiService.updateChannel(id, data);
      setChannel(response.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update channel");
      return null;
    }
  }, []);

  const deleteChannel = useCallback(async (id: number): Promise<boolean> => {
    try {
      await ApiService.deleteChannel(id);
      setChannel(null);
      setSnaps([]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete channel");
      return false;
    }
  }, []);

  const followChannel = useCallback(async (id: number, _userId: number): Promise<boolean> => {
    try {
      // Using generic API to manage user-channel relationship
      await ApiService.createModel("user_channel_follow", {
        userId: _userId,
        channelId: id
      });
      setIsFollowing(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to follow channel");
      return false;
    }
  }, []);

  const unfollowChannel = useCallback(async (id: number, _userId: number): Promise<boolean> => {
    try {
      // Using generic API to remove user-channel relationship
      await ApiService.deleteModel("user_channel_follow", id);
      setIsFollowing(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to unfollow channel");
      return false;
    }
  }, []);

  const addAllSnapsToQueue = useCallback((onAddToQueue: (snapId: number) => void) => {
    snaps.forEach(snap => {
      onAddToQueue(snap.id);
    });
  }, [snaps]);

  const checkFollowStatus = useCallback(async (channelId: number, _userId: number) => {
    try {
      // Check if user follows this channel
      const userResponse = await ApiService.getModelById<User>("user", _userId);
      const following = userResponse.data.followings?.some(ch => ch.id === channelId);
      setIsFollowing(!!following);
    } catch (err) {
      console.error("Failed to check follow status:", err);
    }
  }, []);

  useEffect(() => {
    if (channelId) {
      loadChannel(channelId);
    }
  }, [channelId, loadChannel]);

  return {
    channel,
    snaps,
    isLoading,
    error,
    isFollowing,
    loadChannel,
    createChannel,
    updateChannel,
    deleteChannel,
    followChannel,
    unfollowChannel,
    addAllSnapsToQueue,
    checkFollowStatus,
  };
};