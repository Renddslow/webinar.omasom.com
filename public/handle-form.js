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

  return new Promise((resolve) => {
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
};

(() => {
  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = Array.from(form.keys()).reduce((acc, key) => {
      acc[key] = form.get(key);
      try {
        const date = new Date(acc[key]);
        if (key.startsWith("handout_")) {
          acc.handouts = acc.handouts || [];
          acc.handouts.push({
            type: key.replace("handout_", ""),
            url: acc[key],
          });
        }
        acc[key] = date instanceof Date ? date.toISOString() : acc[key];
      } catch (e) {}
      return acc;
    }, {});

    if (payload.image && payload.image instanceof File) {
      const folder = getFolder(payload.title, payload.image, payload.starts_at);
      const image = await uploadImage(payload.image, folder);
      payload.image = image.filePath;
    }

    const { shortcode, id } = await fetch(e.target.action, {
      method: e.target.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((r) => r.json());
    if (window.location.href.endsWith("new")) {
      window.location.href = window.location.href.replace(
        /new$/,
        shortcode || id,
      );
    }
  });
})();
