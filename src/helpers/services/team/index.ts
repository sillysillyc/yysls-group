import request from '@/helpers/request';

export const fetchTeamCreate = async () => await request.post({ url: '/team/create' });

export const fetchTeamInvite = async () => await request.post({ url: '/team/invite' });

export const fetchTeamRelease = async () => await request.post({ url: '/team/release' });

export const fetchTeamApply = async () => await request.post({ url: '/team/apply' });

export const fetchTeamExit = async () => await request.post({ url: '/team/exit' });

export const fetchTeamEdit = async () => await request.post({ url: '/team/edit' });
