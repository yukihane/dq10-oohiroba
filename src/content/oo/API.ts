type Item = {
  id: string;
  name: string;
  category: string;
};

const parser = new DOMParser();

/**
 * アイテムを名称で部分一致検索します。
 * @param name 名称
 * @param limit 取得上限数。0や未指定の場合は上限なし(ただしシステム上の上限(100件)が存在する)。
 * @returns アイテム
 */
export const searchItem = async (
  name: string,
  limit?: number
): Promise<Item[]> => {
  const items = await searchItemsInternal(name, limit);
  // items.forEach((i) => console.log(i.name));

  return items;
};

const searchItemsInternal = async (
  name: string,
  limit?: number,
  handOverItems: Item[] = [],
  nextPage = 0,
  maxPageNo?: number
): Promise<Item[]> => {
  const url = encodeURI(
    `https://hiroba.dqx.jp/sc/search/${name}/item/page/${nextPage}`
  );

  const response = await fetch(url);
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  const text = await response.text();
  const doc = parser.parseFromString(text, "text/html");
  const rows = doc.querySelectorAll(".searchItemTable > tbody > tr");

  const items = [...rows].map((row) => {
    const link = row.querySelector(".strongLnk");
    const id = link?.getAttribute("href")?.split("/")[4];
    const name = link?.textContent;
    const category = row.querySelector(
      ".searchItemTable > tbody > tr > td:nth-of-type(2) a"
    )?.textContent;
    return { id, name, category } as Item;
  });

  const max =
    maxPageNo !== undefined ? maxPageNo : getMaxPageNo(doc.documentElement);

  const totalItems = [...handOverItems, ...items];
  if ((!!limit && totalItems.length >= limit) || nextPage >= max) {
    // 取得上限に達したか、全ページ取得し終わった
    return totalItems.slice(0, limit);
  }

  return searchItemsInternal(name, limit, totalItems, nextPage + 1, max);
};

/**
 * 0始まりの最大ページ数を返します。
 */
const getMaxPageNo = (elm: Element): number => {
  const pageLinks = elm.querySelectorAll<HTMLInputElement>(
    ".pageNavi > ul > li > a"
  );
  if (pageLinks.length === 0) {
    return 0;
  }

  const pages = [...pageLinks].map((link) => Number(link.dataset.pageno));
  return Math.max(...pages);
};
