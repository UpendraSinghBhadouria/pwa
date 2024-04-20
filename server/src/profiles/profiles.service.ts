import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with userId ${userId} doesn't exist!`);
    }

    return user;
  }

  async getProfile(userId: number) {
    const profile = await this.findOne(userId);

    if (!profile) {
      throw new NotFoundException(`Profile of userId ${userId} doesn't exist!`);
    }

    return profile;
  }

  async computeProfileCompletion() {
    return '40%'; // TODO
  }

  /**
   * Profile
   */
  async findAll() {
    // TODO: add phoneNumber
    return this.prismaService.profile.findMany({
      include: {
        address: true,
        workExperience: true,
        project: true,
        licenseCertification: true,
        education: true,
        awardAchievement: true,
      },
    });
  }

  async findOne(userId: number) {
    const { phoneNumber } = await this.findUser(userId);

    const record = await this.prismaService.profile.findUnique({
      where: { userId },
      include: {
        address: true,
        workExperience: true,
        project: true,
        licenseCertification: true,
        education: true,
        awardAchievement: true,
      },
    });

    return Object.assign(record, { phoneNumber });
  }

  /**
   * Basic
   */
  async findBasic(userId: number) {
    const { phoneNumber } = await this.findUser(userId);

    const record = await this.prismaService.profile.findUnique({
      where: { userId },
    });

    return Object.assign(record, { phoneNumber });
  }

  async createBasic(userId: number, createBasicDto: any) {
    await this.findUser(userId);

    const existingRecord = await this.prismaService.profile.findUnique({
      where: { userId },
    });

    if (existingRecord) {
      throw new ConflictException(
        `Basic profile of userId ${userId} already exists!`,
      );
    }

    const fullName = createBasicDto.firstName + ' ' + createBasicDto.lastName;
    const username = fullName.split(' ').join('') + userId;
    const profileCompletion = this.computeProfileCompletion();

    const basicProfile = await this.prismaService.profile.create({
      data: {
        username,
        fullName,
        profileCompletion,
        ...createBasicDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return basicProfile;
  }

  async updateBasic(userId: number, updateBasicDto: any) {
    await this.findUser(userId);
    await this.getProfile(userId);

    const profileCompletion = this.computeProfileCompletion();

    return this.prismaService.profile.update({
      where: { userId },
      data: { ...updateBasicDto, profileCompletion },
    });
  }

  /**
   * Address
   */
  async findAddress(userId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return profile.address;
  }

  async createAddress(userId: number, createAddressDto: any) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    if (profile.address) {
      throw new ConflictException(
        `Address of userId ${userId} already exists!`,
      );
    }

    return this.prismaService.address.create({
      data: {
        ...createAddressDto,
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  async updateAddress(userId: number, updateAddressDto: any) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return this.prismaService.address.update({
      where: { profileId: profile.id },
      data: updateAddressDto,
    });
  }

  /**
   * Work Experience
   */
  async findWorkExperience(userId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return profile.workExperience;
  }

  async createWorkExperience(userId: number, createWorkExperienceDto: any) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return this.prismaService.workExperience.create({
      data: {
        ...createWorkExperienceDto,
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  async updateWorkExperience(
    userId: number,
    workExperienceId: number,
    updateWorkExperienceDto: any,
  ) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.workExperience.some(
      (workExperience) => workExperience.id === workExperienceId,
    );

    if (!isFound) {
      throw new NotFoundException(
        `Work experience with id ${workExperienceId} doesn't exist!`,
      );
    }

    return this.prismaService.workExperience.update({
      where: { id: workExperienceId },
      data: updateWorkExperienceDto,
    });
  }

  async deleteWorkExperience(userId: number, workExperienceId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.workExperience.some(
      (workExperience) => workExperience.id === workExperienceId,
    );

    if (!isFound) {
      throw new NotFoundException(
        `Work experience with id ${workExperienceId} doesn't exist!`,
      );
    }

    await this.prismaService.workExperience.delete({
      where: { id: workExperienceId },
    });

    return {
      message: `Work experience with id ${workExperienceId} is deleted successfully!`,
    };
  }

  /**
   * Project
   */
  async findProject(userId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return profile.project;
  }

  async createProject(userId: number, createProjectDto: any) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return this.prismaService.project.create({
      data: {
        ...createProjectDto,
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  async updateProject(
    userId: number,
    projectId: number,
    updateProjectDto: any,
  ) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.project.some((project) => project.id === projectId);

    if (!isFound) {
      throw new NotFoundException(
        `Project with id ${projectId} doesn't exist!`,
      );
    }

    return this.prismaService.project.update({
      where: { id: projectId },
      data: updateProjectDto,
    });
  }

  async deleteProject(userId: number, projectId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.project.some((project) => project.id === projectId);

    if (!isFound) {
      throw new NotFoundException(
        `Project with id ${projectId} doesn't exist!`,
      );
    }

    await this.prismaService.project.delete({
      where: { id: projectId },
    });

    return {
      message: `Project with id ${projectId} is deleted successfully!`,
    };
  }

  /**
   * License Certification
   */
  async findLicenseCertification(userId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return profile.licenseCertification;
  }

  async createLicenseCertification(
    userId: number,
    createLicenseCertificationDto: any,
  ) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return this.prismaService.licenseCertification.create({
      data: {
        ...createLicenseCertificationDto,
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  async updateLicenseCertification(
    userId: number,
    licenseCertificationId: number,
    updateLicenseCertificationDto: any,
  ) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.licenseCertification.some(
      (licenseCertification) =>
        licenseCertification.id === licenseCertificationId,
    );

    if (!isFound) {
      throw new NotFoundException(
        `License and certification with id ${licenseCertificationId} doesn't exist!`,
      );
    }

    return this.prismaService.licenseCertification.update({
      where: { id: licenseCertificationId },
      data: updateLicenseCertificationDto,
    });
  }

  async deleteLicenseCertification(
    userId: number,
    licenseCertificationId: number,
  ) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.licenseCertification.some(
      (licenseCertification) =>
        licenseCertification.id === licenseCertificationId,
    );

    if (!isFound) {
      throw new NotFoundException(
        `License certification with id ${licenseCertificationId} doesn't exist!`,
      );
    }

    await this.prismaService.licenseCertification.delete({
      where: { id: licenseCertificationId },
    });

    return {
      message: `License certification with id ${licenseCertificationId} is deleted successfully!`,
    };
  }

  /**
   * Education
   */
  async findEducation(userId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return profile.education;
  }

  async createEducation(userId: number, createEducationDto: any) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return this.prismaService.education.create({
      data: {
        ...createEducationDto,
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  async updateEducation(
    userId: number,
    educationId: number,
    updateEducationDto: any,
  ) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.education.some(
      (education) => education.id === educationId,
    );

    if (!isFound) {
      throw new NotFoundException(
        `Education with id ${educationId} doesn't exist!`,
      );
    }

    return this.prismaService.education.update({
      where: { id: educationId },
      data: updateEducationDto,
    });
  }

  async deleteEducation(userId: number, educationId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.education.some(
      (education) => education.id === educationId,
    );

    if (!isFound) {
      throw new NotFoundException(
        `Education with id ${educationId} doesn't exist!`,
      );
    }

    await this.prismaService.education.delete({
      where: { id: educationId },
    });

    return {
      message: `Education with id ${educationId} is deleted successfully!`,
    };
  }

  /**
   * Award Achievement
   */
  async findAwardAchievement(userId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return profile.awardAchievement;
  }

  async createAwardAchievement(userId: number, createAwardAchievementDto: any) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    return this.prismaService.awardAchievement.create({
      data: {
        ...createAwardAchievementDto,
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  async updateAwardAchievement(
    userId: number,
    awardAchievementId: number,
    updateAwardAchievementDto: any,
  ) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.awardAchievement.some(
      (awardAchievement) => awardAchievement.id === awardAchievementId,
    );

    if (!isFound) {
      throw new NotFoundException(
        `Award and achievement with id ${awardAchievementId} doesn't exist!`,
      );
    }

    return this.prismaService.awardAchievement.update({
      where: { id: awardAchievementId },
      data: updateAwardAchievementDto,
    });
  }

  async deleteAwardAchievement(userId: number, awardAchievementId: number) {
    await this.findUser(userId);
    const profile = await this.getProfile(userId);

    const isFound = profile.awardAchievement.some(
      (awardAchievement) => awardAchievement.id === awardAchievementId,
    );

    if (!isFound) {
      throw new NotFoundException(
        `Award achievement with id ${awardAchievementId} doesn't exist!`,
      );
    }

    await this.prismaService.awardAchievement.delete({
      where: { id: awardAchievementId },
    });

    return {
      message: `Award achievement with id ${awardAchievementId} is deleted successfully!`,
    };
  }
}
