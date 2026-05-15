import type {
  About,
  Copyright,
  Global,
  Home,
  Privacy,
  StrapiResponse,
} from "@/lib/types";
import {
  getAboutContent,
  getCopyrightContent,
  getGlobalContent,
  getHomeContent,
  getPrivacyContent,
} from "@/lib/plank/fetch";

export async function getGlobals(): Promise<StrapiResponse<Global>> {
  return { data: await getGlobalContent() };
}

export async function getHome(): Promise<StrapiResponse<Home>> {
  return { data: await getHomeContent() };
}

export async function getAbout(): Promise<StrapiResponse<About>> {
  return { data: await getAboutContent() };
}

export async function getPrivacy(): Promise<StrapiResponse<Privacy>> {
  return { data: await getPrivacyContent() };
}

export async function getCopyright(): Promise<StrapiResponse<Copyright>> {
  return { data: await getCopyrightContent() };
}
