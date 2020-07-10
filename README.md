# README

# Chat-space DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :comments
- has_many :groups, through: :groups_users
- has_many :groups_users

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|comment|text|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users
- belings_to :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique: true|
### Association
- has_many :comments
- has_many  :users,  through:  :groups_users

## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users
- belongs_to :groups
