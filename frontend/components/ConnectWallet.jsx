import { useState } from 'react'

export default function ConnectWallet() {
  const [isWalletConnected, SetIsWalletConnected] = useState(false)

  const connectWallet = () => {
    window.klaytn.enable()
    SetIsWalletConnected(true)
  }

  // const isWalletConnected = () => {}

  return (
    <div>
      <div>
        {isWalletConnected ? (
          <div>Wallet Connected</div>
        ) : (
          <button type="button" onClick={connectWallet}>
            connectWallet
          </button>
        )}
      </div>
    </div>
  )
}

// 초기화면(홈페이지)에서 서비스 개요를 보여주고, connectWallet 버튼을 제공
// connectWallet을 선택하면, get 요청을 보내 등록된 지갑주소(account)가 있는지 확인
// 계정이 없으면 로그인 실패(isLoggedIn: false), 회원가입이 필요한 서비스임을 안내하고 SignUp 컴포넌트 노출
// SignUp을 완료하면, isLoggedIn 상태도 true로 변경, 피드 컴포넌트와 사이드바 컴포넌트 노출
// 계정이 있으면 로그인 성공(isLoggedIn: true), 피드 컴포넌트와 사이드바 컴포넌트를 노출
