# Internationalization in Next.js 13 with React Server Components
With the introduction of [Next.js 13](https://beta.nextjs.org/docs/getting-started) and [the `app` directory](https://beta.nextjs.org/docs/routing/fundamentals), React Server Components became publicly available. This new paradigm allows components that don’t require React’s interactive features such as `useState` and `useEffect` to remain server-side only.

One area that benefits from this new capability is **internationalization**.
Traditionally, internationalization requires a tradeoff in performance, as fetching translations results in larger client-side bundles and using message parsers impacts the runtime performance of your app.

The promise of **React Server Components** is that we can have our cake and eat it too. If internationalization is implemented entirely on the server side, we can achieve new levels of performance for our apps, leaving the client side for interactive features. But how can we work with this paradigm when we need dynamic states that should be reflected in internationalized messages?

In this article, we’ll explore a multilingual app that displays street photography images from Unsplash. We’ll use [`next-intl`](https://next-intl-docs.vercel.app/) to implement all our internationalization needs in React Server Components and we’ll look at a technique for introducing interactivity without moving more parts than necessary to the client side.

![](Internationalization%20in%20Next.js%2013%20with%20React%20Server%20Components/app-final.png)

[Interactive demo](https://street-photography-viewer.vercel.app/)

## Fetching photos from Unsplash
A key benefit of Server Components is the ability to fetch data directly from inside components via `async`/`await`. We can use this to fetch the photos from Unsplash in our page component.

But first, we need to create our API client based on the official Unsplash SDK.

```tsx
import {createApi} from 'unsplash-js';

const UnsplashApiClient = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY
});

export default UnsplashApiClient;
```

Once we have our client, we can use it in our page component.

```tsx
import {OrderBy} from 'unsplash-js';
import UnsplashApiClient from './UnsplashApiClient';

export default async function Index() {
  const topicSlug = 'street-photography';

  const [topicRequest, photosRequest] = await Promise.all([
    UnsplashApiClient.topics.get({topicIdOrSlug: topicSlug}),
    UnsplashApiClient.topics.getPhotos({
      topicIdOrSlug: topicSlug,
      perPage: 4
    })
  ]);

  return (
    <PhotoViewer
      photos={photosRequest.response.results}
      coverPhoto={topicRequest.response.cover_photo}
    />
  );
}
```

> Note that we use `Promise.all` to invoke both requests that we need to make in parallel. This way we avoid a potential request waterfall.  

At this point, our app renders a simple photo grid.

![](Internationalization%20in%20Next.js%2013%20with%20React%20Server%20Components/app-basic.png)

The app currently uses hard-coded English labels and the dates of the photos are displayed as timestamps—not very user-friendly (yet).

## Adding internationalization with [`next-intl`](https://next-intl-docs.vercel.app/)
We’d like our app to be available in Spanish as well. Support for Server Components is currently in beta for `next-intl`, so we can use [the installation instructions for the latest beta](https://next-intl-docs.vercel.app/docs/next-13/server-components) to set up our app for internationalization.

### Formatting dates

Aside from adding a second language, we’ve already found that the app doesn’t adapt well to English users because the dates should be formatted. To achieve a good user experience, we’d like to tell the user the relative time when the photo was uploaded (e.g. “8 days ago”).

Once  `next-intl` is set up, we can fix the formatting by using the `formatRelativeTime` function in the component that renders each photo.

```tsx
import {useIntl} from 'next-intl';

export default function PhotoGridItem({photo}) {
  const intl = useIntl();
  const updatedAt = new Date(photo.updated_at);

  return (
    <a href={photo.links.html}>
        {/* ... */}
        <p>{intl.formatRelativeTime(updatedAt)}</p>
      </div>
    </a>
  );
}
```

Now the date when a photo has been updated is easier to read.

![](Internationalization%20in%20Next.js%2013%20with%20React%20Server%20Components/app-photo-item-date-formatted.png)

**Hint:** In a traditional React app that is rendered on both the server and client side, it can be quite a challenge to ensure that the displayed relative date is in sync across the server and client. Since these are different environments, and may even be in different time zones, you need to configure a mechanism to provide the server time for the client side. By performing the formatting only on the server side, we don’t have to worry about this problem in the first place.

### ¡Hola! 👋 Translating our app to Spanish

Next, we can replace the static labels in the header with localized messages. These labels are passed as props from the `PhotoViewer` component, so this is our chance to introduce dynamic labels via the `useTranslations` function.

```tsx
import {useTranslations} from 'next-intl';

export default function PhotoViewer(/* ... */) {
  const t = useTranslations('PhotoViewer');

  return (
    <>
      <Header
        title={t('title')}
        description={t('description')}
      />
      {/* ... */}
    </>
  );
}
```

For each internationalized label we add, we need to make sure that there is an appropriate entry set up for all languages.

```js
// en.json
{
  “PhotoViewer”: {
    “title”: “Street photography”,
    “description”: “Street photography captures real-life moments and human interactions in public places. It is a way to tell visual stories and freeze fleeting moments of time, turning the ordinary into the extraordinary.”
  }
}
```

```js
// es.json
{
  “PhotoViewer”: {
    “title”: “Street photography”,
    “description“: “La fotografía callejera capta momentos de la vida real y interacciones humanas en lugares públicos. Es una forma de contar historias visuales y congelar momentos fugaces del tiempo, convirtiendo lo ordinario en lo extraordinario.“
  }
}
```

**Tip:** [`next-intl` provides a TypeScript integration](https://next-intl-docs.vercel.app/docs/usage/typescript) that helps you ensure that you’re only referencing valid message keys.
Once this is done, we can visit the Spanish version of the app at `/es`.

![](Internationalization%20in%20Next.js%2013%20with%20React%20Server%20Components/app-basic-es-framed.png)

So far, so good!

## Adding interactivity: Dynamic ordering of photos
By default, the Unsplash API returns the most popular photos. We want the user to be able to change the order to show the most recent photos first.

Here, the question arises whether we should resort to client-side data fetching so that we can implement this feature with `useState`. However, that would require us to move all of our components to the client side, resulting in a bloated bundle.

Do we have an alternative? We do in fact. And it’s a capability that has been around on the web for ages: **query parameters** (sometimes referred to as [search params](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)). What makes query parameters a great option for our use case is that they can be read on the server side.

So let’s modify our page component to receive `searchParams` via props.

```tsx
export default async function Index({searchParams}) {
  const orderBy = searchParams.orderBy || OrderBy.POPULAR;

  const [/* ... */, photosRequest] = await Promise.all([
    /* ... */,
    UnsplashApiClient.topics.getPhotos({orderBy, /* ... */})
  ]);
```

After this change, the user can already navigate to `/?orderBy=latest` to change the order of the displayed photos.

In turn, we should provide a select widget that enables the user to change the value of the query parameter.

![](Internationalization%20in%20Next.js%2013%20with%20React%20Server%20Components/app-order-select-collapsed.png)

To be able to process the change event of the `select` element, we have no choice but to mark the component with `'use client';` so that we can implement the event handler. Nevertheless, we would like to keep the internationalization concerns on the server side to reduce the size of the client bundle.

Let’s have a look at the required markup for our [`select` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select).

```html
<select>
  <option value=“popular”>Popular</option>
  <option value="latest">Latest</option>
</select>
```

This API provides the ability to pass the internationalized `option` elements from a Server Component via `children`, to a Client Component that processes only the `select` element.

Let’s implement the `select` element for the client side.

```tsx
'use client';

import {useRouter} from 'next-intl/client';

export default function OrderBySelect({orderBy, children}) {
  const router = useRouter();

  function onChange(event) {
    // The `useRouter` hook from `next-intl` automatically
    // considers a potential locale prefix of the pathname.
    router.replace('/?orderBy=' + event.target.value);
  }

  return (
    <select defaultValue={orderBy} onChange={onChange}>
      {children}
    </select>
  );
}
```

Now, let’s use our component in `PhotoViewer`.

```tsx
import {useTranslations} from 'next-intl';
import OrderBySelect from './OrderBySelect';

export default function PhotoViewer({orderBy, /* ... */}) {
  const t = useTranslations('PhotoViewer');

  return (
    <>
      {/* ... */}
      <OrderBySelect orderBy={orderBy}>
        <option value="popular">{t('orderBy.popular')}</option>
        <option value="latest">{t('orderBy.latest')}</option>
      </OrderBySelect>
    </>
  );
}
```

With this pattern, the markup for the internationalized `option` elements is now generated on the server side and passed to the `OrderBySelect`, which handles the change event on the client side.

**Tip:** Since we have to wait for the updated markup to be generated on the server side when the order is changed, we may want to show the user a loading indicator. React 18 introduced [the `useTransition` hook](https://beta.reactjs.org/reference/react/useTransition)  which is integrated with Server Components. This allows us to disable the `select` element while waiting for a response from the server.

```tsx
import {useRouter} from 'next-intl/client';
import {useTransition} from 'react';

export default function OrderBySelect({orderBy, children}) {
  const [isTransitioning, startTransition] = useTransition();
  const router = useRouter();

  function onChange(event) {
    startTransition(() => {
      router.replace('/?orderBy=' + event.target.value);
    });
  }

  return (
    <select disabled={isTransitioning} /* ... */>
      {children}
    </select>
  );
}
```

## Adding more interactivity: Page controls
The same pattern we explored for changing the order can be applied to page controls by introducing a `page` query parameter.

![](Internationalization%20in%20Next.js%2013%20with%20React%20Server%20Components/app-pagination.png)

Note that languages have different rules for handling decimal and thousand separators. Also, languages have different forms of pluralization. English only makes a grammatical distinction between one and zero/many elements, but, for example, Croatian has a separate form for “few” elements.

`next-intl` uses the [ICU syntax](https://next-intl-docs.vercel.app/docs/usage/messages#rendering-of-messages) which makes it possible to express these language subtleties.

```js
// en.json
{
  "Pagination": {
    "info": "Page {page, number} of {totalPages, number} ({totalElements, plural, =1 {one result} other {# results}} in total)",
    // ...
  }
}
```

To implement the feature, this time we don’t need to mark a component with `'use client';`. Instead, we can implement this with regular anchor tags.

```tsx
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/solid';
import {Link, useTranslations} from 'next-intl';
import Text from './Text';

export default function Pagination({pageInfo, orderBy}) {
  const t = useTranslations('Pagination');
  const totalPages = Math.ceil(pageInfo.totalElements / pageInfo.size);

  function getHref(page) {
    return {
      // Since we're using `Link` from next-intl, a potential locale
      // prefix of the pathname is automatically considered.
      pathname: '/',
      // Keep an existing `orderBy` parameter. 
      query: {orderBy, page}
    };
  }

  return (
    <>
      {pageInfo.page > 1 && (
        <Link aria-label={t('prev')} href={getHref(pageInfo.page - 1)}>
          <ArrowLeftIcon />
        </Link>
      )}
      <Text>{t('info', {...pageInfo, totalPages})}</Text>
      {pageInfo.page < totalPages && (
        <Link aria-label={t('prev')} href={getHref(pageInfo.page + 1)}>
          <ArrowRightIcon />
        </Link>
      )}
    </>
  );
}
```

## Conclusion
### Query parameters are a great alternative to `useState`
Query parameters are a great way to implement interactive features in Next.js apps, as they help to reduce the bundle size of the client side.

Apart from performance, there are other **benefits of using query parameters**:

1. URLs with query parameters can be shared while preserving state.
2. Bookmarks preserve the state as well.
3. You can optionally integrate with the browser history, enabling undoing state changes via the back button.

Note however that there are also **tradeoffs to consider**:

1. Query parameter values are strings, so you may need to serialize and deserialize data types.
2. The URL is part of the user interface, so using many query parameters may affect readability.

### Server Components are a great match for internationalization

Internationalization is an important part of the user experience, whether you support multiple languages or you want to get the subtleties of a particular language right. A library like [`next-intl`](https://next-intl-docs.vercel.app/) can help with both cases.

Implementing internationalization in Next.js apps has historically come with a performance tradeoff, but with Server Components this is no longer the case. However, it might take some time to explore and learn patterns that will help you keep your internationalization concerns on the server side.

Another aspect to consider is that you might want to consider implementing loading states, scine network latency introduces a delay before your users see the result of their actions.
- - - -
You can have a look at the complete [code of the example on GitHub](https://github.com/amannn/street-photography-viewer).
