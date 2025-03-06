import request from '@/helpers/request';

export const fetchTeamCreate = async () => {
  try {
    const res = await request.post({ url: '/team/create' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTeamInvite = async () => {
  try {
    const res = await request.post({ url: '/team/invite' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTeamRelease = async () => {
  try {
    const res = await request.post({ url: '/team/release' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTeamApply = async () => {
  try {
    const res = await request.post({ url: '/team/apply' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTeamExit = async () => {
  try {
    const res = await request.post({ url: '/team/exit' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTeamEdit = async () => {
  try {
    const res = await request.post({ url: '/team/edit' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
