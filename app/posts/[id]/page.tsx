const content = `<p><strong>Author:</strong> Jane Doe<br><strong>Date:</strong> 2023-12-10<br><strong>Likes:</strong> 120<br><strong>Comments:</strong> 30</p><p>A deep dive into the mysteries of the underwater world.</p><hr class="novel-mt-4 novel-mb-6 novel-border-t novel-border-stone-300"><h3>Description</h3><p>In this fascinating article, we explore the vast and mysterious world beneath the ocean's surface. The ocean, covering over 70% of the Earth's surface, is home to a myriad of creatures and geological wonders that have intrigued scientists and adventurers for centuries.</p><p>Join us as we delve into the depths, uncovering the secrets of this vast underwater realm. From the vibrant coral reefs teeming with life to the eerie, unexplored trenches that plunge into the ocean's darkest corners, every discovery paints a more detailed picture of our planet's most enigmatic and uncharted territory.</p><hr class="novel-mt-4 novel-mb-6 novel-border-t novel-border-stone-300"><p><strong>Read more about our oceanic adventures and discoveries at </strong><a target="_blank" rel="noopener noreferrer nofollow" class="novel-text-stone-400 novel-underline novel-underline-offset-[3px] hover:novel-text-stone-600 novel-transition-colors novel-cursor-pointer" href="http://OurWebsite.com"><strong>OurWebsite.com</strong></a><strong>.</strong></p><code><pre>{JSON.stringify(params, null, 2)}</pre></code>`;

export default function PostDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-4xl font-bold">PostDetail</h1>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose"
      ></div>
    </div>
  );
}
