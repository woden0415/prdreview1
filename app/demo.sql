/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost
 Source Database       : demo

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : utf-8

 Date: 05/06/2020 13:48:39 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `demo`
-- ----------------------------
DROP TABLE IF EXISTS `demo`;
CREATE TABLE `demo` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `demo`
-- ----------------------------
BEGIN;
INSERT INTO `demo` VALUES ('1', '测试数据1'), ('2', '测试数据2');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
