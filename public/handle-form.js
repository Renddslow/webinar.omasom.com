const getPath = (title, image, starts_at) => {
  const date = new Date(starts_at);
  const [ext] = image.name.split(".").slice(-1);
  const slug = title.split(":")[0].replace(/\s+/g, "-").toLowerCase();
  const dateFolder = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
  return `${slug}/${dateFolder}/webinar_header.${ext}`;
};

const uploadImage = async (file, src) => {
  return new Promise((resolve) => {
    window.imageKit.upload(
      {
        file,
        src,
        tags: ["webinar"],
      },
      (err, result) => {
        console.log(err);
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
      const value = form.get(key);
      // dot-prop set
      if (key.includes(".")) {
        const [first, ...rest] = key.split(".");
        acc[first] = { ...acc[first], [rest.join(".")]: value };
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (payload.image && payload.image instanceof File) {
      const imageUrl = window.imageKit.url({
        path: getPath(payload.title, payload.image, payload.starts_at),
        transformation: [{ width: 550, height: 300, crop: true }],
      });
      await uploadImage(payload.image, imageUrl);
      payload.image = imageUrl;
    }
    fetch(e.target.action, {
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
