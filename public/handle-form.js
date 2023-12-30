const getFolder = (title, image, starts_at) => {
  const date = new Date(starts_at);
  const slug = title.split(":")[0].replace(/\s+/g, "-").toLowerCase();
  const dateFolder = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  return `${slug}/${dateFolder}`;
};

const uploadImage = async (file, folder) => {
  const { token, signature, expire } = await fetch(
    "/admin/utils/upload-key",
  ).then((r) => r.json());
  const [ext] = file.name.split(".").slice(-1);

  await new Promise((resolve) => {
    window.imageKit.upload(
      {
        file,
        folder,
        fileName: `webinar_header.${ext}`,
        tags: ["webinar"],
        token,
        signature,
        expire,
      },
      (err, result) => {
        resolve(result);
      },
    );
  });
  return `/${folder}/webinar_header.${ext}`;
};

(() => {
  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = Array.from(form.keys()).reduce((acc, key) => {
      acc[key] = form.get(key);
      try {
        const date = new Date(acc[key]);
        acc[key] = date instanceof Date ? date.toISOString() : acc[key];
      } catch (e) {}
      return acc;
    }, {});

    if (payload.image && payload.image instanceof File) {
      const folder = getFolder(payload.title, payload.image, payload.starts_at);
      payload.image = await uploadImage(payload.image, folder);
    }

    const id = await fetch(e.target.action, {
      method: e.target.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((r) => console.log(r));
  });
})();
