<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { loadSlim } from 'tsparticles-slim'
import type { ICodeInfo, IFormInfo } from "./types"
import type { FormInstance, FormRules } from 'element-plus'

const options = ref({
  background: {
    color: {
      value: '#409eff'
    }
  },
  // backgroundColor:'#000000',
  fpsLimit: 120,
  interactivity: {
    // 交互性
    events: {
      // 事件
      onClick: {
        // 1.点击
        enable: false,
        mode: 'push' // "push", "remove", "repulse", "bubble"
      },
      onHover: {
        // 2.悬停
        enable: false,
        mode: 'grab' // "grab"(磁吸), "repulse"(排斥), "bubble"(气泡)
      },
      resize: true //调整大小
    },
    modes: {
      // 气泡
      bubble: {
        distance: 400,
        duration: 2, //持续时间
        opacity: 0.8,
        size: 40
      },
      // 推
      push: {
        quantity: 4 //数量
      },
      // 排斥
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  // 粒子
  particles: {
    color: {
      value: '#ffffff'
    },
    // 是否用直线连接起来
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    // 碰撞
    collisions: {
      enable: false
    },
    // 移动
    move: {
      direction: 'none',
      enable: true,
      // 输出模式
      outModes: {
        default: 'bounce' //弹跳
      },
      random: false, //是否随机
      speed: 2, // 速度
      straight: false //是否直线
    },
    number: {
      // 密度 用value值除以区域值
      density: {
        enable: true,
        area: 1000
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    // 形状
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 10 }
    }
  },
  detectRetina: true
});

const userInfo: IFormInfo = reactive({
  username: null,
  password: null,
  rememberPassword: false,
  verifyCode: null
});

const tabs = [
  { label: '账号登录', key: 'user' },
  { label: '手机登录', key: 'phone' }
]

const userInputRef = ref<HTMLInputElement | null>(null);

const codeInputRef = ref<HTMLInputElement | null>(null);

const ruleFormRef = ref<FormInstance | null>(null);

const verifyCodeState: ICodeInfo = reactive({
  count: -1,
  timer: undefined
});

const activeTabKey = ref(tabs[0]?.key);

// 校验规则
const userRules = reactive<FormRules<IFormInfo>>({
  username: [
    { required: true, message: '用户名不能为空！', trigger: 'blur' },
    { pattern: /^[a-z0-9]{6,20}$/, message: '用户名必须是6~20个字母或数字！', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空！', trigger: 'blur' },
  ]
});

const phoneRules = reactive<FormRules<IFormInfo>>({
  username: [
    { required: true, message: '手机号不能为空！', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号必须11位', trigger: 'blur' },
  ],
  verifyCode: [
    { required: true, message: '验证码不能为空！', trigger: 'blur' },
    { min: 6, max: 6, message: '请填写6位验证码！', trigger: 'blur' },
  ]
});

const particlesInit = async (engine) => await loadSlim(engine);

// 立即登录按钮
const onSubmit = async (formEl: FormInstance | null) => {
  console.log(userInfo);
  await formEl?.validate()
}

// 获取验证码按钮
const getVerifyCode = () => {
  if(!userInfo.username) {
    userInputRef.value?.focus && userInputRef.value.focus();
    return
  }
  codeInputRef.value?.focus && codeInputRef.value.focus()
  verifyCodeState.count = 59
  verifyCodeState.timer = setInterval(() => {
    if(verifyCodeState.count > -1) {
      verifyCodeState.count--
    } else {
      clearInterval(verifyCodeState.timer)
    }
  }, 1000)
};

const verifyCodeBtnText = computed(() => {
  if(verifyCodeState.count !== -1) {
    return `${verifyCodeState.count}秒后重发`
  } else {
    return "获取验证码"
  }
});
</script>

<template>
  <div class="login">
    <vue-particles id="tsparticles" :options="options" :particlesInit="particlesInit" />
    <div class="login-content">
      <div class="login-header">
        <div class="login-header-logo"></div>
        <div class="login-header-title">DJ-CMS</div>
      </div>
      <div class="login-main">
        <div class="login-main-radioType">
          <el-radio-group v-model="activeTabKey">
            <el-radio-button v-for="item in tabs" :key="item.key" :label="item.key" icon="el-icon-plus">
            {{
              item.label
            }}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="login-main-form-box">
          <el-form 
            ref="ruleFormRef" 
            :model="userInfo" 
            :rules="activeTabKey === 'user' ? userRules : phoneRules"
          >
            <el-form-item class="login-form-item" prop="username">
              <el-input 
                class="login-form-input fontsize12"
                v-model="userInfo.username" 
                :placeholder="activeTabKey === 'user' ? '请输入用户名' : '请输入手机号'" 
                clearable 
              />
            </el-form-item>

            <el-form-item class="login-form-item" v-show="activeTabKey === 'user'"  prop="password">
              <el-input 
                class="fontsize12"
                ref="userInputRef"
                v-model="userInfo.password" 
                placeholder="请输入密码" 
                clearable 
                show-password
              />
            </el-form-item>

            <el-form-item class="login-form-item" v-show="activeTabKey === 'phone'" prop="verifyCode">
              <el-col :span="14">
                <el-input
                  class="fontsize12"
                  ref="codeInputRef"
                  style="width: 134px;height: 30px;"
                  v-model="userInfo.verifyCode" 
                  placeholder="验证码"
                  :minlength="6"
                  :maxlength="6"
                  clearable 
                />
              </el-col>
              <el-col :span="10">
                <el-button 
                  class="fontsize12" 
                  style="width: 100px;height: 30px;" 
                  :disabled="verifyCodeState.count !== -1"
                  @click="getVerifyCode"
                >{{ verifyCodeBtnText }}</el-button>
              </el-col>
            </el-form-item>

            <el-form-item class="login-form-item rememberAndForgetPassword-item" :class="{ 'is-hide': activeTabKey === 'phone' }">
              <el-checkbox class="rememberPassword-checkbox" size="small" v-model="userInfo.rememberPassword" label="记住密码" />
              <el-button class="forgetPassword-btn">忘记密码</el-button>
            </el-form-item>

            <el-form-item class="login-form-itemSubmit">
              <el-button class="fontsize12 login-submitBtn" type="primary" @click="onSubmit(ruleFormRef)">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .login-content {
    position: relative;
    padding: 20px 60px 30px;
    background-color: rgba(255, 255, 255, .7);
    border-radius: 6px;
    .login-header {
      display: flex;
      justify-content: center;
      align-items: center;
      &-logo {
        width: 50px;
        height: 50px;
        background: url('../../assets/image/logo.png') no-repeat;
        background-size: 100%;
      }
      &-title {
        font-family: math;
        font-size: 30px;
        font-weight: bold;
        color: #1296db;
      }
    }
    .login-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      .login-main-radioType {
        :deep(.el-radio-group) {
          .el-radio-button {
            .el-radio-button__inner {
              width: 120px !important;
            }
          }
        }
      }
      .login-main-form-box {
        margin-top: 20px;
        width: 240px;
        .login-form-item {
          margin-bottom: 14px;
          :deep(.el-form-item__content) {
            .el-form-item__error {
              font-size: 10px !important;
            }
          }
        }
        .rememberAndForgetPassword-item {
          :deep(.el-form-item__content) {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .rememberPassword-checkbox {
            :deep(.el-checkbox__label) {
              font-size: 12px !important;
            }
          }
          .forgetPassword-btn {
            font-size: 12px;
            color: #1296db;
            background-color: transparent;
            border-color: transparent;
          }
        }
        .login-form-item.is-hide {
          visibility: hidden;
        }
        .login-form-itemSubmit {
          margin: 40px 0 0 0;
          .login-submitBtn {
            width: 240px;
          }
        }
      }
    }
  }
}
</style>
