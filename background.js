chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
  // 根据发布者昵称创建文件夹
  const folderName = item.publisherName;

  // 创建文件夹
  chrome.downloads.onChanged.addListener(function (change) {
    if (change.state && change.state.current === "in_progress") {
      chrome.downloads.setShelfEnabled(false);
      chrome.downloads.open({ itemId: item.id });
      closed.remove(item.id);
    }
  });
  chrome.downloads.setShelfEnabled(true);

  // 指定保存的文件名和位置
  suggest({
    filename: folderName + "/" + item.filename,
    conflictAction: "overwrite",
  });
});