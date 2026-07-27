// アクティブなタブの content script にコピー実行を依頼する
async function requestCopyEid(tab) {
  if (!tab?.id) return;

  try {
    await chrome.tabs.sendMessage(tab.id, { action: 'copy-eid' });
  } catch (err) {
    // Googleカレンダー以外のタブでは content script が存在しないため無視
    console.log('EID Copier: このタブでは利用できません', err.message);
  }
}

// キーボードショートカット（chrome://extensions/shortcuts で編集可能）
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== 'copy-eid') return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await requestCopyEid(tab);
});

// ツールバーの拡張機能アイコンのクリック
chrome.action.onClicked.addListener((tab) => {
  requestCopyEid(tab);
});
