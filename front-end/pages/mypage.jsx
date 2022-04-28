import React, { useState, useEffect } from 'react';

export default function myPage({
  nickname,
  setNickname,
  image,
  setImage,
  account,
  setAccount,
}) {
  // props로 받지 않고 연결된 클레이튼 지갑주소를 바로 받을 때 사용
  // const account = window.klaytn.selectedAddress

  const [userProfileImage, setUserProfileImage] = useState({ file: '' });
  const [profilePreviewUrl, setProfilePreviewUrl] = useState('');

  const handleImageFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setUserProfileImage({ file: file });
      setProfilePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 지갑주소로 유저 정보 조회
  // fetch(`/mypage/${account}`).then((res) => {
  //   setNickname(res.nickName) // 수정필요
  //   setImage(res.image) // 수정필요
  //   setUserProfileImage(res.profileImage)
  // })

  // 프로필 정보 변경
  const updateUser = async () => {
    const formData = new FormData();

    formData.append('nickname', nickname);
    formData.append('profileImage', userProfileImage);

    // formData를 console.log로 확인할 수 없으므로 아래의 코드를 활용해서 formData의 내용을 확인할 수 있다
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      await fetch(`/mypage/update`, {
        method: 'PATCH', // PATCH or PUT
        body: formData,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Profile
      <div>
        {/* {account ? ( */}
        <div>
          <div>Your wallet adress is {account}</div>
          <form className='form' encType='multipart/form-data'>
            <div className='fieldContainer'>
              <div className='inputTitle'>닉네임 변경하기</div>
              {/* <div>Your nickname is {nickname}</div> */}
              <div className='inputContainer'>
                <input
                  onChange={(event) => setNickname(event.target.value)}
                  required
                  className='inputField'
                  name='nickname'
                  placeholder='변경할 닉네임을 입력하세요'
                />
              </div>
            </div>
            {/* 프로필 이미지 업로드 기능 추가*/}
            <div className='fieldContainer'>
              <div className='inputTitle'>프로필 이미지 변경하기</div>
              <input
                type='file'
                name='profileImage'
                id='proflieImage'
                accept='image/jpg,image/jpeg,image/gif,image/png'
                onChange={handleImageFile}
              />
            </div>
            <div className='preview'>
              Preview
              {profilePreviewUrl ? (
                <img
                  src={profilePreviewUrl}
                  alt='Profile Preview'
                  width='200'
                />
              ) : (
                <div>
                  Your Proflie Image
                  <img src={image} width='200' height='200' />
                  {/* 현재 SignUp에서 랜덤 이미지 생성을 n번 누르면 n-1번째에 누른 이미지의 url을 받아옴, 수정필요 */}
                </div>
              )}
            </div>
            <button className='updateButton' type='button' onClick={updateUser}>
              변경하기
            </button>
          </form>
        </div>
        {/* ) : (
          <div>Please connect your wallet</div>
        )} */}
      </div>
      <form className='updateUser'></form>
    </div>
  );

  // 회원정보를 연결된 지갑주소로 조회하기 구현
  // 닉네임 중복 체크 기능 추가구현
  // 보유 토큰량 추가구현
  // tailwind css
}
