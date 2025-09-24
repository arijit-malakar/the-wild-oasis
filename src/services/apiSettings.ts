import type { SettingsType } from "../features/settings/settingsType";
import supabase from "./supabase";

const getSettings = async (): Promise<SettingsType> => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
};

const updateSetting = async (newSetting: Partial<SettingsType>) => {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
};

export { getSettings, updateSetting };
