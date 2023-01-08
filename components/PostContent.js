import ReactTimeAgo from 'react-time-ago'
import Avatar from './Avatar'
import Link from 'next/link'
import PostButtons from '../components/PostButtons'

export default function PostContent({
  text,
  author,
  createdAt,
  _id,
  likesCount,
  big = false,
  likedByMe,
}) {
  return (
    <div>
      <div className="flex w-full">
        <div>{!!author?.image && <Avatar src={author.image} />}</div>
        <div className="pl-2 grow">
          <div>
            <span className="font-bold pr-1">{author.name}</span>
            {big && <br />}
            <span className=" text-twitterLightGray">@{author.username}</span>
            {createdAt && !big && (
              <span className="pl-1 text-twitterLightGray">
                <ReactTimeAgo
                  date={Date.parse(createdAt)}
                  timeStyle={'twitter'}
                />
              </span>
            )}
          </div>
          {!big && (
            <div>
              <Link href={`/${author.username}/status/${_id}`}>{text}</Link>
              <PostButtons
                id={_id}
                likesCount={likesCount}
                likedByMe={likedByMe}
              />
            </div>
          )}
        </div>
      </div>
      {big && (
        <div className="mt-2">
          <Link href={`/${author.username}/status/${_id}`}>{text}</Link>
          {createdAt && (
            <div className="text-sm text-twitterLightGray">
              {new Date(createdAt)
                .toISOString()
                .replace('T', ' ')
                .slice(0, 16)
                .split(' ')
                .reverse()
                .join(' ')}
            </div>
          )}
          <PostButtons id={_id} likesCount={likesCount} likedByMe={likedByMe} />
        </div>
      )}
    </div>
  )
}
