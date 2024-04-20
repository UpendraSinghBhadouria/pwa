export const basicDtoSwaggerSchema = {
  type: 'object',
  properties: {
    avatar: { type: 'string' },
    username: { type: 'string' },
    fullName: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    bio: { type: 'string' },
    email: { type: 'string' },
    dob: { type: 'string' },
    gender: { type: 'string' },
  },
};

export const addressDtoSwaggerSchema = {
  type: 'object',
  properties: {
    line: { type: 'string' },
    country: { type: 'string' },
    state: { type: 'string' },
    cityDistrict: { type: 'string' },
    pincode: { type: 'string' },
  },
};

export const workExperienceDtoSwaggerSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      company: { type: 'string' },
      from: { type: 'string' },
      to: { type: 'string' },
    },
  },
};

export const projectDtoSwaggerSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      url: { type: 'string' },
    },
  },
};

export const licenseCertificationDtoSwaggerSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      provider: { type: 'string' },
      from: { type: 'string' },
      to: { type: 'string' },
      url: { type: 'string' },
    },
  },
};

export const educationDtoSwaggerSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      schoolCollage: { type: 'string' },
      university: { type: 'string' },
      degree: { type: 'string' },
      from: { type: 'string' },
      to: { type: 'string' },
    },
  },
};

export const awardAchievementDtoSwaggerSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      url: { type: 'string' },
    },
  },
};
