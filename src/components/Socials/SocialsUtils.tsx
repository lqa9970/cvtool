import * as Yup from "yup";

export type SocialLinks = {
    [key: string]: string;
};

const githubRegex = /^(?:ht{2}ps?:\/{2})?(?:w{3}\.)?github\.com(?:\/[\w-]+){1,2}$/;
const linkedinRegex = /^(http(s)?:\/\/)?(\w+\.)?linkedin\.com\/(pub|in|profile)\/([\dA-Za-z-]+)\/*/gm;
const webRegex = /^(?:https?:\/\/)?(?:www\.)?[\w-]+\.[A-Za-z]{2,6}(?:\/[\w#]+)*(?:\/\w+\?\w+=\w+(?:&\w+=\w+)*)?$/;

export const linksSchema = Yup.object().shape({
    github: Yup.string().matches(githubRegex,'Please enter valid URL'),
    linkedin: Yup.string().matches(linkedinRegex,'Please enter valid URL'),
    website: Yup.string().matches(webRegex,'Please enter valid URL'),
});
