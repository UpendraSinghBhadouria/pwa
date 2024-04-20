import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import * as ProfilesDtoSchema from './profiles.dto';
import * as ProfileSwaggerSchema from './profiles.swagger.schema';
import * as ProfilesSwaggerExample from './profiles.swagger.example';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  /**
   * Profile
   */
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.profilesService.findOne(+userId);
  }

  /**
   * Basic
   */
  @Get(':userId/basic')
  findBasic(@Param('userId') userId: string) {
    return this.profilesService.findBasic(+userId);
  }

  @Post(':userId/basic')
  @ApiBody({
    schema: ProfileSwaggerSchema.basicDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.basicDtoSwaggerExample,
  })
  createBasic(
    @Param('userId') userId: string,
    @Body() createBasicDto: ProfilesDtoSchema.BasicDtoSchema,
  ) {
    const validatedData =
      ProfilesDtoSchema.basicDtoSchema.parse(createBasicDto);
    return this.profilesService.createBasic(+userId, validatedData);
  }

  @Patch(':userId/basic')
  @ApiBody({
    schema: ProfileSwaggerSchema.basicDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.basicDtoSwaggerExample,
  })
  updateBasic(
    @Param('userId') userId: string,
    @Body() updateBasicDto: ProfilesDtoSchema.BasicDtoSchema,
  ) {
    const validatedData =
      ProfilesDtoSchema.basicDtoSchema.parse(updateBasicDto);
    return this.profilesService.updateBasic(+userId, validatedData);
  }

  /**
   * Address
   */
  @Get(':userId/address')
  findAddress(@Param('userId') userId: string) {
    return this.profilesService.findAddress(+userId);
  }

  @Post(':userId/address')
  @ApiBody({
    schema: ProfileSwaggerSchema.addressDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.addressDtoSwaggerExample,
  })
  createAddress(
    @Param('userId') userId: string,
    @Body() createAddressDto: ProfilesDtoSchema.AddressDtoSchema,
  ) {
    const validatedData =
      ProfilesDtoSchema.addressDtoSchema.parse(createAddressDto);
    return this.profilesService.createAddress(+userId, validatedData);
  }

  @Patch(':userId/address')
  @ApiBody({
    schema: ProfileSwaggerSchema.addressDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.addressDtoSwaggerExample,
  })
  updateAddress(
    @Param('userId') userId: string,
    @Body() updateAddressDto: ProfilesDtoSchema.AddressDtoSchema,
  ) {
    const validatedData =
      ProfilesDtoSchema.addressDtoSchema.parse(updateAddressDto);
    return this.profilesService.updateAddress(+userId, validatedData);
  }

  /**
   * Work Experience
   */
  @Get(':userId/work-experience')
  findWorkExperience(@Param('userId') userId: string) {
    return this.profilesService.findWorkExperience(+userId);
  }

  @Post(':userId/work-experience')
  @ApiBody({
    schema: ProfileSwaggerSchema.workExperienceDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.workExperienceDtoSwaggerExample,
  })
  createWorkExperience(
    @Param('userId') userId: string,
    @Body() createWorkExperienceDto: ProfilesDtoSchema.WorkExperienceDtoSchema,
  ) {
    const validatedData = ProfilesDtoSchema.workExperienceDtoSchema.parse(
      createWorkExperienceDto,
    );
    return this.profilesService.createWorkExperience(+userId, validatedData);
  }

  @Patch(':userId/work-experience/:workExperienceId')
  @ApiBody({
    schema: ProfileSwaggerSchema.workExperienceDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.workExperienceDtoSwaggerExample,
  })
  updateWorkExperience(
    @Param('userId') userId: string,
    @Param('workExperienceId') workExperienceId: string,
    @Body() updateWorkExperienceDto: ProfilesDtoSchema.WorkExperienceDtoSchema,
  ) {
    const validatedData = ProfilesDtoSchema.workExperienceDtoSchema.parse(
      updateWorkExperienceDto,
    );
    return this.profilesService.updateWorkExperience(
      +userId,
      +workExperienceId,
      validatedData,
    );
  }

  @Delete(':userId/work-experience/:workExperienceId')
  deleteWorkExperience(
    @Param('userId') userId: string,
    @Param('workExperienceId') workExperienceId: string,
  ) {
    return this.profilesService.deleteWorkExperience(
      +userId,
      +workExperienceId,
    );
  }

  /**
   * Project
   */
  @Get(':userId/project')
  findProject(@Param('userId') userId: string) {
    return this.profilesService.findProject(+userId);
  }

  @Post(':userId/project')
  @ApiBody({
    schema: ProfileSwaggerSchema.projectDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.projectDtoSwaggerExample,
  })
  createProject(
    @Param('userId') userId: string,
    @Body() createProjectDto: ProfilesDtoSchema.ProjectDtoSchema,
  ) {
    const validatedData =
      ProfilesDtoSchema.projectDtoSchema.parse(createProjectDto);
    return this.profilesService.createProject(+userId, validatedData);
  }

  @Patch(':userId/project/:projectId')
  @ApiBody({
    schema: ProfileSwaggerSchema.projectDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.projectDtoSwaggerExample,
  })
  updateProject(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: ProfilesDtoSchema.ProjectDtoSchema,
  ) {
    const validatedData =
      ProfilesDtoSchema.projectDtoSchema.parse(updateProjectDto);
    return this.profilesService.updateProject(
      +userId,
      +projectId,
      validatedData,
    );
  }

  @Delete(':userId/project/:projectId')
  deleteProject(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.profilesService.deleteProject(+userId, +projectId);
  }

  /**
   * License and Certification
   */
  @Get(':userId/license-certification')
  findLicenseCertification(@Param('userId') userId: string) {
    return this.profilesService.findLicenseCertification(+userId);
  }

  @Post(':userId/license-certification')
  @ApiBody({
    schema: ProfileSwaggerSchema.licenseCertificationDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.licenseCertificationDtoSwaggerExample,
  })
  createLicenseCertification(
    @Param('userId') userId: string,
    @Body()
    createLicenseCertificationDto: ProfilesDtoSchema.LicenseCertificationDtoSchema,
  ) {
    const validatedData = ProfilesDtoSchema.licenseCertificationDtoSchema.parse(
      createLicenseCertificationDto,
    );
    return this.profilesService.createLicenseCertification(
      +userId,
      validatedData,
    );
  }

  @Patch(':userId/license-certification/:licenseCertificationId')
  @ApiBody({
    schema: ProfileSwaggerSchema.licenseCertificationDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.licenseCertificationDtoSwaggerExample,
  })
  updateLicenseCertification(
    @Param('userId') userId: string,
    @Param('licenseCertificationId') licenseCertificationId: string,
    @Body()
    updateLicenseCertificationDto: ProfilesDtoSchema.LicenseCertificationDtoSchema,
  ) {
    const validatedData = ProfilesDtoSchema.licenseCertificationDtoSchema.parse(
      updateLicenseCertificationDto,
    );
    return this.profilesService.updateLicenseCertification(
      +userId,
      +licenseCertificationId,
      validatedData,
    );
  }

  @Delete(':userId/license-certification/:licenseCertificationId')
  deleteLicenseCertification(
    @Param('userId') userId: string,
    @Param('licenseCertificationId') licenseCertificationId: string,
  ) {
    return this.profilesService.deleteLicenseCertification(
      +userId,
      +licenseCertificationId,
    );
  }

  /**
   * Education
   */
  @Get(':userId/education')
  findEducation(@Param('userId') userId: string) {
    return this.profilesService.findEducation(+userId);
  }

  @Post(':userId/education')
  @ApiBody({
    schema: ProfileSwaggerSchema.educationDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.educationDtoSwaggerExample,
  })
  createEducation(
    @Param('userId') userId: string,
    @Body()
    createEducationDto: ProfilesDtoSchema.EducationDtoSchema,
  ) {
    const validatedData =
      ProfilesDtoSchema.educationDtoSchema.parse(createEducationDto);
    return this.profilesService.createEducation(+userId, validatedData);
  }

  @Patch(':userId/education/:educationId')
  @ApiBody({
    schema: ProfileSwaggerSchema.educationDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.educationDtoSwaggerExample,
  })
  updateEducation(
    @Param('userId') userId: string,
    @Param('educationId') educationId: string,
    @Body() updateEducationDto: ProfilesDtoSchema.EducationDtoSchema,
  ) {
    const validatedData =
      ProfilesDtoSchema.educationDtoSchema.parse(updateEducationDto);
    return this.profilesService.updateEducation(
      +userId,
      +educationId,
      validatedData,
    );
  }

  @Delete(':userId/education/:educationId')
  deleteEducation(
    @Param('userId') userId: string,
    @Param('educationId') educationId: string,
  ) {
    return this.profilesService.deleteEducation(+userId, +educationId);
  }

  /**
   * Award and Achievement
   */
  @Get(':userId/award-achievement')
  findAwardAchievement(@Param('userId') userId: string) {
    return this.profilesService.findAwardAchievement(+userId);
  }

  @Post(':userId/award-achievement')
  @ApiBody({
    schema: ProfileSwaggerSchema.awardAchievementDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.awardAchievementDtoSwaggerExample,
  })
  createAwardAchievement(
    @Param('userId') userId: string,
    @Body()
    createAwardAchievementDto: ProfilesDtoSchema.AwardAchievementDtoSchema,
  ) {
    const validatedData = ProfilesDtoSchema.awardAchievementDtoSchema.parse(
      createAwardAchievementDto,
    );
    return this.profilesService.createAwardAchievement(+userId, validatedData);
  }

  @Patch(':userId/award-achievement/:awardAchievementId')
  @ApiBody({
    schema: ProfileSwaggerSchema.awardAchievementDtoSwaggerSchema,
    examples: ProfilesSwaggerExample.awardAchievementDtoSwaggerExample,
  })
  updateAwardAchievement(
    @Param('userId') userId: string,
    @Param('awardAchievementId') awardAchievementId: string,
    @Body() updateAwardAchievement: ProfilesDtoSchema.AwardAchievementDtoSchema,
  ) {
    const validatedData = ProfilesDtoSchema.awardAchievementDtoSchema.parse(
      updateAwardAchievement,
    );
    return this.profilesService.updateAwardAchievement(
      +userId,
      +awardAchievementId,
      validatedData,
    );
  }

  @Delete(':userId/award-achievement/:awardAchievementId')
  deleteAwardAchievement(
    @Param('userId') userId: string,
    @Param('awardAchievementId') awardAchievementId: string,
  ) {
    return this.profilesService.deleteAwardAchievement(
      +userId,
      +awardAchievementId,
    );
  }
}
