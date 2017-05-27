export const sampleCode = `
  <pre>
    <code class="typescript highlight">
      likesSubject: Subject<number> = new Subject();
      likesSubscription: Subscription;

      dislikesSubject: Subject<number> = new Subject();
      dislikesSubscription: Subscription;

      _.cloneDeep(this.ds.getImagesSync()).forEach(image => this.album.images.push(image));

      this.likesSubscription = this.likesSubject
        .scan((acc, value) => acc + value)
        .subscribe(totalLikes => this.album.likes = totalLikes);

      this.dislikesSubscription = this.dislikesSubject
        .scan((acc, value) => acc + value)
        .subscribe(totalDislikes => this.album.dislikes = totalDislikes);
    </code>
</pre>
        `;
