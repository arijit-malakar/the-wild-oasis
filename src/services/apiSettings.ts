const settingsUrl = "/api/settings/6576fd84cff421773bc40417";

export const getSettings = async () => {
  const res = await fetch(settingsUrl);

  if (!res.ok) throw new Error("Failed to load settings");

  const body = await res.json();
  return body.data;
};

export const updateSetting = async (newSetting: { [key: string]: number }) => {
  const res = await fetch(settingsUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSetting),
  });

  if (!res.ok) throw new Error("Failed to update settings");

  const body = await res.json();
  return body.data;
};
