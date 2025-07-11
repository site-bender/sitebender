CREATE TYPE "ActionType" AS ENUM (
    'CreateAction',      -- Creating new content
    'UpdateAction',      -- Editing existing content
    'PublishAction',     -- Publishing content
    'AssessAction',      -- Moderator reviews
    'ReviewAction',      -- Adding annotations/feedback
    'OrganizeAction',    -- Organizing content
    'SearchAction',      -- Searching content
    'InteractAction',    -- Viewing/reading content
    'CommentAction'      -- Adding comments/annotations
);
CREATE TYPE "Audience" AS ENUM ('public', 'private');
CREATE TYPE "CommunicationChannel" AS ENUM ('voice', 'voicemail', 'sms', 'mms', 'fax', 'video', 'tty', 'whatsapp', 'signal', 'telegram');
CREATE TYPE "ContentRating" AS ENUM ('general', 'adult');
CREATE TYPE "CreativeWorkStatus" AS ENUM ('draft', 'pending', 'published', 'archived', 'obsolete');
CREATE TYPE "Language" AS ENUM ('af', 'am', 'ar', 'arn', 'ary', 'as', 'az', 'ba', 'be', 'bg', 'bn', 'bo', 'br', 'bs', 'ca', 'ckb', 'co', 'cs', 'cy', 'da', 'de', 'dsb', 'dv', 'el', 'en', 'es', 'et', 'eu', 'fa', 'fi', 'fil', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gsw', 'gu', 'ha', 'he', 'hi', 'hr', 'hsb', 'hu', 'hy', 'id', 'ig', 'is', 'it', 'iu', 'ka', 'kk', 'kl', 'km', 'kn', 'kok', 'ku', 'ky', 'lb', 'lt', 'lv', 'mk', 'ml', 'mn', 'moh', 'mr', 'ms', 'mt', 'my', 'nb', 'ne', 'ni', 'gil', 'nl', 'nn', 'no', 'oc', 'or', 'pa', 'pap', 'pl', 'prs', 'ps', 'pt', 'qu', 'quc', 'rm', 'ro', 'ru', 'rw', 'sa', 'sah', 'se', 'si', 'sk', 'sl', 'sma', 'smj', 'smn', 'sms', 'sq', 'sr', 'st', 'sv', 'sw', 'syc', 'ta', 'te', 'tg', 'tk', 'tn', 'tr', 'tt', 'tzm', 'ug', 'uk', 'ur', 'uz', 'vi', 'wo', 'xh', 'yo', 'zu');
CREATE TYPE "MediaObjectType" AS ENUM ('AudioObject', 'ImageObject', 'MusicVideoObject','VideoObject');
CREATE TYPE "PhoneType" AS ENUM ('mobile', 'landline', 'voip', 'satellite', 'pbx');
