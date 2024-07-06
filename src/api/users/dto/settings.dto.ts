import { IsBoolean, IsNotEmpty } from 'class-validator';

export class EmailsSubscription {
  @IsBoolean()
  @IsNotEmpty()
  courseUpdates: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  quizUpdates: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  announcements: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  SecurityFeatures: Boolean;

  @IsBoolean()
  @IsNotEmpty()
  ProductUpgrades: Boolean;
}

export class SettingsDto {
  @IsNotEmpty()
  @IsBoolean()
  emailSubscription: EmailsSubscription;

  @IsNotEmpty()
  @IsBoolean()
  publicProfile: Boolean;

  @IsNotEmpty()
  @IsBoolean()
  publicPortfolio: Boolean;

  @IsNotEmpty()
  @IsBoolean()
  publicBio: Boolean;

  @IsNotEmpty()
  @IsBoolean()
  publicEmail: Boolean;

  @IsNotEmpty()
  @IsBoolean()
  publicGithub: Boolean;

  @IsNotEmpty()
  @IsBoolean()
  publicLinkdin: Boolean;

  @IsNotEmpty()
  @IsBoolean()
  publicProjects: Boolean;

  @IsNotEmpty()
  @IsBoolean()
  publicCourses: Boolean;
}
