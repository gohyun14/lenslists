export const ipfsLinkTransform = (raw: string): string => {
  if (raw.includes("ipfs://")) {
    // fetch(raw.replace("ipfs://", "https://ipfs.io/ipfs/")).then((res) =>
    //   console.log(res)
    // );
    // console.log(raw.replace("ipfs://", "https://ipfs.io/ipfs/"));
    return raw.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return raw;
};

export const contentTokenTransform = (raw: string): string[] => {
  const content = raw.split(" ");
  const contentReturned: string[] = [""];
  for (let i = 0; i < content.length; i++) {
    if (content[i]?.startsWith("@") || content[i]?.startsWith(`https://`)) {
      contentReturned.push(`${content[i]} `);
      contentReturned.push("");
    } else {
      contentReturned[contentReturned.length - 1] += content[i] + " ";
    }
  }
  if (contentReturned[contentReturned.length - 1] === "") {
    contentReturned.pop();
  }
  return contentReturned;
};
