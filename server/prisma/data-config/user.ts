import { ProfileGender, PrismaClient } from '@prisma/client';
import { fakerEN_IN as faker } from '@faker-js/faker';
import { State, City } from 'country-state-city';
import dayjs from 'dayjs';
import merge from 'lodash.merge';
import { getRandomBoolean, getRandomNumber } from '../seed.utils';
type gender = 'male' | 'female';

export default async function user(prisma: PrismaClient) {
  for (const [index] of Array.from({ length: 10 }).entries()) {
    // Add one record of yourself
    const myInfo = {
      phoneNumber: '+919718773603',
      isPhoneNumberVerified: true,
      isNewUser: false,
      profile: {
        create: {
          avatar: 'https://avatars.githubusercontent.com/u/5189668?v=4',
          username: 'rajbharti',
          fullName: 'Raj Kumar Bharti',
          firstName: 'Raj Kumar',
          lastName: 'Bharti',
          email: 'raj.kb@bezt.in',
          isEmailVerified: true,
          gender: 'MALE',
        },
      },
    };

    const insertEmptyProfile = (index + 1) % 3 === 0;
    const insertEmpty = (index + 1) % 4 === 0;
    const phoneNumber = faker.phone.number().split('-').join('');
    const randomGender = ['male', 'female'][getRandomNumber(2)] as gender;
    const firstName = faker.person.firstName(randomGender);
    const lastName = faker.person.lastName(randomGender);
    const fullName = firstName + ' ' + lastName;
    const gender = [randomGender.toUpperCase(), 'RATHER_NOT_TO_SAY'][
      getRandomNumber(2)
    ] as ProfileGender;

    const country = 'India';
    const countryCode = 'IN';
    const states = State.getStatesOfCountry(countryCode);
    const randomState = states[getRandomNumber(states.length)];
    const cities = City.getCitiesOfState(countryCode, randomState.isoCode);
    const randomCity = cities[getRandomNumber(cities.length)];

    const onBoardingAboutUs = ['Word of mouth', 'Social Media', 'Others'][
      getRandomNumber(3)
    ];
    const onBoardingGoal = [
      ['Job Opportunities', 'Paid Internships'],
      ['Competive Exams'],
      [['Self Assessment', 'Higher-Ed Abroad']],
    ][getRandomNumber(3)];

    const onBoardingSlugDetails = [
      [
        {
          title: 'How did you hear about us?',
          content: [onBoardingAboutUs],
        },
      ],
      [
        {
          title: 'How did you hear about us?',
          content: [onBoardingAboutUs],
        },
        {
          title: 'What’s your goal?',
          content: onBoardingGoal,
        },
      ],
    ][getRandomNumber(2)];

    const slug = [null, '/onboarding/step1', '/onboarding/step2'][
      getRandomNumber(3)
    ];

    const existingRecord = await prisma.user.findUnique({
      where: {
        phoneNumber,
      },
    });

    if (existingRecord) {
      continue;
    }

    await prisma.user.create({
      data: merge(
        {
          phoneNumber: phoneNumber,
          isPhoneNumberVerified: insertEmpty ? false : getRandomBoolean(),
          isNewUser: getRandomBoolean(),
          onBoarding: insertEmpty
            ? {}
            : {
                create: {
                  slug,
                  details: onBoardingSlugDetails,
                  electives: [
                    {
                      tier1Id: 1,
                      tier2Id: 2,
                      tier3Id: [4, 6, 7],
                    },
                  ],
                },
              },
          profile: insertEmptyProfile
            ? {}
            : {
                create: {
                  avatar: faker.image.avatarGitHub(),
                  username: faker.internet.userName(),
                  fullName,
                  firstName,
                  lastName,
                  bio: [
                    faker.person.bio(),
                    faker.person.bio(),
                    faker.person.bio(),
                  ].join(''),
                  email: faker.internet.email(),
                  isEmailVerified: getRandomBoolean(),
                  dob: faker.date.birthdate(),
                  gender,
                  resume: 'https://www.example.com/resume.pdf',
                  profileCompletion: getRandomNumber(10, 100),
                  address: insertEmpty
                    ? {}
                    : {
                        create: {
                          line1: faker.location.streetAddress(),
                          country,
                          state: randomState.name,
                          cityDistrict: randomCity.name,
                          pincode: faker.location.zipCode({
                            format: '######',
                          }),
                        },
                      },
                  workExperience: insertEmpty
                    ? {}
                    : {
                        create: [
                          {
                            title: faker.person.jobTitle(),
                            company: faker.company.name(),
                            from: faker.date.past().toISOString(),
                            to: [dayjs().format(), null][getRandomNumber(2)],
                          },
                        ],
                      },
                  project: insertEmpty
                    ? {}
                    : {
                        create: [
                          {
                            title: faker.commerce.productName(),
                            description: faker.lorem.paragraph(2),
                            url: [null, faker.internet.url()][
                              getRandomNumber(2)
                            ],
                          },
                          {
                            title: faker.commerce.productName(),
                            description: faker.lorem.paragraph(2),
                            url: [null, faker.internet.url()][
                              getRandomNumber(2)
                            ],
                          },
                        ],
                      },
                  licenseCertification: insertEmpty
                    ? {}
                    : {
                        create: [
                          {
                            name: faker.commerce.productName(),
                            provider: faker.company.name(),
                            from: faker.date.past().toISOString(),
                            to: dayjs().format(),
                            url: faker.internet.url(),
                          },
                          {
                            name: faker.commerce.productName(),
                            provider: faker.company.name(),
                            from: faker.date.past().toISOString(),
                            to: dayjs().format(),
                            url: faker.internet.url(),
                          },
                        ],
                      },
                  education: insertEmpty
                    ? {}
                    : {
                        create: [
                          {
                            schoolCollage: faker.person.jobTitle(),
                            university: [null, faker.person.jobTitle()][
                              getRandomNumber(2)
                            ],
                            degree: faker.person.jobTitle(),
                            from: faker.date.past().toISOString(),
                            to: [null, dayjs().format()][getRandomNumber(2)],
                          },
                        ],
                      },
                  awardAchievement: insertEmpty
                    ? {}
                    : {
                        create: [
                          {
                            title: faker.commerce.productName(),
                            description: faker.lorem.paragraph(2),
                            url: faker.internet.url(),
                          },
                        ],
                      },
                },
              },
        },
        index == 0 ? myInfo : {},
      ),
    });
  }
}
