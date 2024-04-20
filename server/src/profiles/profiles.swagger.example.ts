import { fakerEN_IN as faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { ProfileGender } from '@prisma/client';
import { getRandomNumber } from 'prisma/seed.utils';

type gender = 'male' | 'female';
const randomGender = ['male', 'female'][getRandomNumber(2)] as gender;

export const basicDtoSwaggerExample = {
  example1: {
    value: {
      firstName: faker.person.firstName(randomGender),
      lastName: faker.person.lastName(randomGender),
      bio: [faker.person.bio(), faker.person.bio(), faker.person.bio()].join(
        '',
      ),
      email: faker.internet.email(),
      dob: faker.date.birthdate(),
      gender: [randomGender.toUpperCase(), 'RATHER_NOT_TO_SAY'][
        getRandomNumber(2)
      ] as ProfileGender,
    },
  },
};

export const addressDtoSwaggerExample = {
  example1: {
    value: {
      line1: faker.location.streetAddress(),
      country: 'India',
      state: 'Rajasthan',
      cityDistrict: 'Jaipur',
      pincode: faker.location.zipCode({
        format: '######',
      }),
    },
  },
};

export const workExperienceDtoSwaggerExample = {
  example1: {
    value: {
      title: faker.person.jobTitle(),
      company: faker.company.name(),
      from: faker.date.past().toISOString(),
      to: dayjs().format(),
    },
  },
};

export const projectDtoSwaggerExample = {
  example1: {
    value: {
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(2),
      url: faker.internet.url(),
    },
  },
};

export const licenseCertificationDtoSwaggerExample = {
  example1: {
    value: {
      name: faker.commerce.productName(),
      provider: faker.company.name(),
      from: faker.date.past().toISOString(),
      to: dayjs().format(),
      url: faker.internet.url(),
    },
  },
};

export const educationDtoSwaggerExample = {
  example1: {
    value: {
      schoolCollage: faker.person.jobTitle(),
      university: faker.person.jobTitle(),
      degree: faker.person.jobTitle(),
      from: faker.date.past().toISOString(),
      to: dayjs().format(),
    },
  },
};

export const awardAchievementDtoSwaggerExample = {
  example1: {
    value: {
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(2),
      url: faker.internet.url(),
    },
  },
};
